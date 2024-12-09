"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const UpdateCron_1 = require("./cron/UpdateCron");
const plums_1 = __importDefault(require("./routes/plums"));
const cors_1 = __importDefault(require("cors"));
const account_1 = __importDefault(require("./routes/account"));
dotenv_1.default.config();
UpdateCron_1.checkCronResultJob.start();
UpdateCron_1.updateCronJob.start();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
let apiRouter = express_1.default.Router();
apiRouter.use(express_1.default.json());
apiRouter.use('/plums', plums_1.default);
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use('/account', account_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Server : http://localhost:${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map