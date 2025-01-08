import { useEffect, useState } from "react";

interface TemplateProps {
    value: string | number | { [key: number]: { value: string } };
    onChange: (newValue: any) => void;
    result?: number;
}

const handleInputChange =
(
    setInputValue : React.Dispatch<React.SetStateAction<any>>,
    stringProps : TemplateProps,
    value: string | number | { [key: number]: { value: string } },
) => {
    const newValue = value;
    stringProps.onChange(newValue);
    setInputValue(newValue);
};

// String template
export function TemplateString( stringProps : TemplateProps) {

    const [inputValue, setInputValue] = useState(stringProps.value.toString());

    return (
        <div>
        <input
                type='text'
                defaultValue={inputValue}
                onChange={(e) => {handleInputChange(setInputValue, stringProps, e.target.value);}}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
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
                onChange={(e) => {handleInputChange(setInputValue, numberProps, Number(e.target.value));}}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
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
                        onChange={(e) => {setSelectedValue(option.key); handleInputChange(setSelectedValue, radioProps, option.key);}}
                        className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">{option.value}</span>
                </label>
            ))}
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
            <span>Every</span>

            <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="border rounded-md px-2 py-1"
            >
                {CRON_FREQUENCIES.map((freq) => (
                    <option key={freq} value={freq}>
                        {freq}
                    </option>
                ))}
            </select>

            {frequency === "year" && (
                <>
                    <span>in</span>
                    <select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="border rounded-md px-2 py-1"
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
                    <span>on</span>
                    <select
                        value={dayOfMonth}
                        onChange={(e) => setDayOfMonth(e.target.value)}
                        className="border rounded-md px-2 py-1"
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
                <span>and</span>
            )}

            {(frequency === "week") && (
                <span>on</span>
            )}

            {(frequency === "week" || frequency === "month" || frequency === "year") && (
                <>
                    <select
                        value={dayOfWeek}
                        onChange={(e) => setDayOfWeek(e.target.value)}
                        className="border rounded-md px-2 py-1"
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
                    <span>at</span>
                    <select
                        value={hour}
                        onChange={(e) => setHour(e.target.value)}
                        className="border rounded-md px-2 py-1"
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
                <span>at</span>
            )}

            {(frequency === "day" || frequency === "week" || frequency === "month" || frequency === "year") && (
                <span>:</span>
            )}

            {(frequency !== "minute(s)") && (
                <>
                    <select
                        value={minute}
                        onChange={(e) => setMinute(e.target.value)}
                        className="border rounded-md px-2 py-1"
                    >
                        {MINUTES.map((m) => (
                            <option key={m} value={m}>
                                {m.toString().padStart(2, "0")}
                            </option>
                        ))}
                    </select>
                    <span>minute(s)</span>
                </>
            )}

            <button
                onClick={clearCron}
                className="text-red-500 border border-red-500 rounded-md px-2 py-1"
            >
                Clear
            </button>
        </div>
    );
}
