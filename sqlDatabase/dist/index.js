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
const pg_1 = require("pg");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const pgClient = new pg_1.Client("ppostgresql://learningSQL_owner:npg_WXYetG9d1UNj@ep-shiny-darkness-a8q16t84-pooler.eastus2.azure.neon.tech/learningSQL?sslmode=require");
pgClient.connect();
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    try {
        const q = `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}');`;
        console.log(q);
        const response = yield pgClient.query(q);
        console.log(response.rows);
        res.json({
            message: "Signup SUccesfully"
        });
    }
    catch (error) {
        console.log(error);
    }
}));
// async function main() {
//     // const response = await pgClient.query("INSERT INTO users (username, email, password) VALUES ('sudhanshuBhola', 'dlfjddfwbfjwhbsfdfjhwsjdjksk@gmail.com', '123jchbsdwckjwncchbsj4567890')");
//     const response = await pgClient.query("DELETE FROM users WHERE id = 4");
//     // const response = await pgClient.query("SELECT * FROM users")
//     console.log(response.rows);
// }
// main();  
app.listen(3000);
