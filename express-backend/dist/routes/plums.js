"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = __importDefault(require("../prismaClient"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/plums', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, actionTemplateId, actionValue, triggerTemplateId, triggerValue } = req.body;
    try {
        const user = yield prismaClient_1.default.user.findUnique({ where: { userId: userId } });
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        const actionTemplate = yield prismaClient_1.default.actionTemplate.findUnique({ where: { id: actionTemplateId } });
        if (!actionTemplate)
            return res.status(404).json({ error: 'ActionTemplate not found' });
        const triggerTemplate = yield prismaClient_1.default.triggerTemplate.findUnique({ where: { id: triggerTemplateId } });
        if (!triggerTemplate)
            return res.status(404).json({ error: 'TriggerTemplate not found' });
        const action = yield prismaClient_1.default.action.create({
            data: {
                actionTemplateId,
                actionValue: actionValue || actionTemplate.valueTemplate,
            },
        });
        const trigger = yield prismaClient_1.default.trigger.create({
            data: {
                triggerTemplateId,
                triggerValue: triggerValue || triggerTemplate.valueTemplate,
            },
        });
        const plum = yield prismaClient_1.default.plum.create({
            data: {
                userId,
                actionId: action.id,
                triggerId: trigger.id,
            },
            include: {
                user: true,
                action: {
                    include: { actionTemplate: true },
                },
                trigger: {
                    include: { triggerTemplate: true },
                },
            },
        });
        res.status(201).json(plum);
    }
    catch (error) {
        console.error('Error creating Plum:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = router;
//# sourceMappingURL=plums.js.map