import { useEffect, useState, useRef } from "react";

interface TemplateProps {
    value: string | number | { [key: number]: { value: string } };
    onChange: (newValue: any, isError: boolean) => void;
    result?: number | string;
}

const handleInputChange =
(
    setInputValue : React.Dispatch<React.SetStateAction<any>>,
    stringProps : TemplateProps,
    value: string | number | { [key: number]: { value: string } },
    isError: boolean = false
) => {
    const newValue = value;
    stringProps.onChange(newValue, isError);
    setInputValue(newValue);
};

// String template
export function TemplateString(stringProps : TemplateProps) {
    const [inputValue, setInputValue] = useState(stringProps.value.toString());

    return (
        <div>
            <input
                type='text'
                defaultValue={inputValue}
                onChange={(e) => { handleInputChange(setInputValue, stringProps, e.target.value); }}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-customDarkDarkGreen text-gray-700 dark:text-gray-300"
                placeholder={`Enter a string`}
            />
        </div>
    );
}

// Number template
export function TemplateNumber(numberProps: TemplateProps) {
    const [inputValue, setInputValue] = useState(numberProps.value.toString());

    return (
        <div>
            <input
                type="number"
                defaultValue={inputValue}
                onChange={(e) => { handleInputChange(setInputValue, numberProps, Number(e.target.value)); }}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-sm bg-white dark:bg-customDarkDarkGreen text-gray-700 dark:text-gray-300"
                placeholder="Enter a number"
                step="any"
            />
        </div>
    );
}

// Radio button template
export function TemplateRadio(radioProps: TemplateProps) {
    const optionArray = Object.entries(radioProps.value).map(([key, obj]) => ({
        key: Number(key),
        value: obj,
    }));

    const [selectedValue, setSelectedValue] = useState(radioProps.result);

    return (
        <div className="space-y-2">
            {optionArray.map((option) => (
                <label key={option.key} className="flex items-center space-x-2">
                    <input
                        type="radio"
                        name="template-radio"
                        checked={option.key === selectedValue}
                        onChange={(e) => { setSelectedValue(option.key); handleInputChange(setSelectedValue, radioProps, option.key); }}
                        className="form-radio h-4 w-4 text-blue-600 dark:text-blue-400"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{option.value}</span>
                </label>
            ))}
        </div>
    );
}

// Search dropdown template
export function TemplateSearchDropdown(searchDropdownProps: TemplateProps) {
    const [selectedValue, setSelectedValue] = useState(searchDropdownProps.result);
    const [isPanelVisible, setIsPanelVisible] = useState(false);
    const [isCorrect, setIsCorrect] = useState(true);
    const [correctKey, setCorrectKey] = useState(searchDropdownProps.result);
    const containerRef = useRef<HTMLDivElement>(null);

    const optionArray = Object.entries(searchDropdownProps.value).map(([key, obj]) => ({
        key: key,
        value: obj,
    }));

    const [searchValue, setSearchValue] = useState(optionArray.find((option) => option.key === selectedValue)?.value || "");

    const filteredOptions = optionArray.filter((option) =>
        option.value.toString().toLowerCase().startsWith(searchValue.toString().toLowerCase())
    );

    const handleOptionClick = (optionKey: string) => {
        setSelectedValue(optionKey);
        setSearchValue(optionArray.find((option) => option.key === optionKey)?.value || "");
        setIsPanelVisible(false);
        isCorrectValue(optionArray.find((option) => option.key === optionKey)?.value || "");
        setCorrectKey(optionKey);
    };

    const isCorrectValue = (value : string) => {
        const isCorrect = optionArray.some((option) => option.value.toString().toLowerCase() === value.toString().toLowerCase());
        setIsCorrect(isCorrect);
        if (isCorrect) {
            setCorrectKey(optionArray.find((option) => option.value.toString().toLowerCase() === value.toString().toLowerCase())?.key);
        }
    }

    // Handle clicks outside the component
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsPanelVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={containerRef} className="space-y-2 relative">
            {/* Search Input */}
            <input
                type="text"
                value={searchValue}
                onChange={(e) => { setSearchValue(e.target.value); isCorrectValue(e.target.value); handleInputChange(setSelectedValue, searchDropdownProps, optionArray.find((option) => option.value.toLowerCase() === e.target.value.toLowerCase())?.key || optionArray[0].key, !optionArray.some((option) => option.value.toLowerCase() === e.target.value.toLowerCase())); }}
                onFocus={() => setIsPanelVisible(true)}
                className={`w-full border rounded-md px-3 py-2 text-sm ${ (isCorrect) ? "border-gray-300 dark:border-gray-600" : "border-red-500 dark:border-red-600" } bg-white dark:bg-customDarkDarkGreen text-gray-700 dark:text-gray-300`}
                placeholder="Search"
            />

            {/* Options Panel */}
            {isPanelVisible && (
                <div
                    className="w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-customDarkDarkGreen shadow-md z-50 mt-1 overflow-auto max-h-48"
                    style={{ top: "100%" }}
                >
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                            <div
                                key={option.key}
                                onClick={() => { handleOptionClick(option.key); setSearchValue(option.value); isCorrectValue(option.value); handleInputChange(setSelectedValue, searchDropdownProps, option.key, false); }}
                                className="px-3 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 text-sm"
                            >
                                {option.value}
                            </div>
                        ))
                    ) : (
                        <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">No results found</div>
                    )}
                </div>
            )}
        </div>
    );
}

const CRON_FREQUENCIES = ["year", "month", "week", "day", "hour", "minute(s)"];
const MONTH = ["every month", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const DAYS_OF_WEEK = ["every days of the week", "SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const HOURS = ["every hours", ...Array.from({ length: 24 }, (_, i) => i)]; // 0 to 23
const MINUTES = ["every", ...Array.from({ length: 60 }, (_, i) => i)]; // 0 to 59
const DAYS_OF_MONTH = ["every days of the month", ...Array.from({ length: 31 }, (_, i) => i + 1)]; // 1 to 31


// Cron template
export function TemplateCron(cronProps: TemplateProps) {
    const [frequency, setFrequency] = useState<string>("year");
    const [month, setMonth] = useState<string>("every month");
    const [dayOfMonth, setDayOfMonth] = useState<string | number>("every days of the month");
    const [dayOfWeek, setDayOfWeek] = useState<string>("every days of the week");
    const [hour, setHour] = useState<string | number>("every hours");
    const [minute, setMinute] = useState<string | number>("every");

    const [cronValue, setCronValue] = useState(cronProps.value);

    const clearCron = () => {
        setMonth("every month");
        setDayOfMonth("every days of the month");
        setDayOfWeek("every days of the week");
        setHour("every hours");
        setMinute("every");
    };

    useEffect(() => {
        if (cronProps.value === "* * * * *") {
            setFrequency("minute(s)");
            setMinute("every");
            return;
        }

        const cronArray = cronProps.value.toString().split(" ");
        const [minuteValue, hourValue, dayOfMonthValue, monthValue, dayOfWeekValue] = cronArray;

        setMinute(minuteValue);
        setHour(hourValue);

        if (monthValue !== "*") {
            setFrequency("year");
            setMonth(MONTH[Number(monthValue)]);
        } else if (dayOfMonthValue !== "*") {
            setFrequency("month");
            setDayOfMonth(Number(dayOfMonthValue));
        } else if (dayOfWeekValue !== "*") {
            setFrequency("week");
            setDayOfWeek(DAYS_OF_WEEK[Number(dayOfWeekValue) + 1]);
        } else if (hourValue !== "*") {
            setFrequency("day");
        } else if (minuteValue !== "*") {
            setFrequency("hour");
        } else {
            setFrequency("minute(s)");
        }
    }, [cronProps.value]);

    useEffect(() => {
        let cron = "";
        const monthValue = month === "every month" ? "*" : MONTH.indexOf(month);
        const dayOfMonthValue = dayOfMonth === "every days of the month" ? "*" : dayOfMonth;
        const dayOfWeekValue = dayOfWeek === "every days of the week" ? "*" : DAYS_OF_WEEK.indexOf(dayOfWeek) - 1;
        const hourValue = hour === "every hours" ? "*" : hour;
        const minuteValue = minute === "every" ? "*" : minute;

        switch (frequency) {
            case "year":
                cron = `${minuteValue} ${hourValue} ${dayOfMonthValue} ${monthValue} ${dayOfWeekValue}`;
                break;
            case "month":
                cron = `${minuteValue} ${hourValue} ${dayOfMonthValue} * ${dayOfWeekValue}`;
                break;
            case "week":
                cron = `${minuteValue} ${hourValue} * * ${dayOfWeekValue}`;
                break;
            case "day":
                cron = `${minuteValue} ${hourValue} * * *`;
                break;
            case "hour":
                cron = `${minuteValue} * * * *`;
                break;
            case "minute(s)":
                cron = `* * * * *`;
                break;
            default:
                cron = "* * * * *";
        }
        handleInputChange(setCronValue, cronProps, cron);
    }, [minute, hour, dayOfWeek, dayOfMonth, month, frequency]);

    return (
        <div className="space-x-2 space-y-2">
            <span className="text-gray-700 dark:text-gray-300">Every</span>

            <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="border rounded-md px-2 py-1 bg-white dark:bg-customDarkDarkGreen text-gray-700 dark:text-gray-300 dark:border-gray-600"
            >
                {CRON_FREQUENCIES.map((freq) => (
                    <option key={freq} value={freq}>
                        {freq}
                    </option>
                ))}
            </select>

            {frequency === "year" && (
                <>
                    <span className="text-gray-700 dark:text-gray-300">in</span>
                    <select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="border rounded-md px-2 py-1 bg-white dark:bg-customDarkDarkGreen text-gray-700 dark:text-gray-300 dark:border-gray-600"
                    >
                        {MONTH.map((month) => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                </>
            )}

            {(frequency === "month" || frequency === "year") && (
                <>
                    <span className="text-gray-700 dark:text-gray-300">on</span>
                    <select
                        value={dayOfMonth}
                        onChange={(e) => setDayOfMonth(e.target.value)}
                        className="border rounded-md px-2 py-1 bg-white dark:bg-customDarkDarkGreen text-gray-700 dark:text-gray-300 dark:border-gray-600"
                    >
                        {DAYS_OF_MONTH.map((day) => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                </>
            )}

            {(frequency === "month" || frequency === "year") && (
                <span className="text-gray-700 dark:text-gray-300">and</span>
            )}

            {(frequency === "week") && (
                <span className="text-gray-700 dark:text-gray-300">on</span>
            )}

            {(frequency === "week" || frequency === "month" || frequency === "year") && (
                <>
                    <select
                        value={dayOfWeek}
                        onChange={(e) => setDayOfWeek(e.target.value)}
                        className="border rounded-md px-2 py-1 bg-white dark:bg-customDarkDarkGreen text-gray-700 dark:text-gray-300 dark:border-gray-600"
                    >
                        {DAYS_OF_WEEK.map((day) => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                </>
            )}

            {(frequency === "day" || frequency === "week" || frequency === "month" || frequency === "year") && (
                <>
                    <span className="text-gray-700 dark:text-gray-300">at</span>
                    <select
                        value={hour}
                        onChange={(e) => setHour(e.target.value)}
                        className="border rounded-md px-2 py-1 bg-white dark:bg-customDarkDarkGreen text-gray-700 dark:text-gray-300 dark:border-gray-600"
                    >
                        {HOURS.map((h) => (
                            <option key={h} value={h}>
                                {h.toString().padStart(2, "0")}
                            </option>
                        ))}
                    </select>
                </>
            )}

            {(frequency === "hour") && (
                <span className="text-gray-700 dark:text-gray-300">at</span>
            )}

            {(frequency === "day" || frequency === "week" || frequency === "month" || frequency === "year") && (
                <span className="text-gray-700 dark:text-gray-300">:</span>
            )}

            {(frequency !== "minute(s)") && (
                <>
                    <select
                        value={minute}
                        onChange={(e) => setMinute(e.target.value)}
                        className="border rounded-md px-2 py-1 bg-white dark:bg-customDarkDarkGreen text-gray-700 dark:text-gray-300 dark:border-gray-600"
                    >
                        {MINUTES.map((m) => (
                            <option key={m} value={m}>
                                {m.toString().padStart(2, "0")}
                            </option>
                        ))}
                    </select>
                    <span className="text-gray-700 dark:text-gray-300">minute(s)</span>
                </>
            )}

            <button
                onClick={clearCron}
                className="text-red-500 dark:text-red-400 border border-red-500 dark:border-red-600 rounded-md px-2 py-1"
            >
                Clear
            </button>
        </div>
    );
}
