import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import mg from "nodemailer-mailgun-transport";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = (email) => {
    const options = {
        auth:{
            api_key:process.env.MAILGUN_APIKEY,
            domain:process.env.DOMAIN
        }
    };
    const client = nodemailer.createTransport(mg(options));
    return client.sendMail(email, (err, info) => {
        if(err){
            console.log(`Error: ${err}`);
        }else{
            console.log(`Response: ${info}`);
        }
    });
};

export const sendSecretMail = (address, secret) => {
    const email = {
        from:process.env.MY_EMAIL_TEMP2,
        to:address,
        subject:"Login Secret for Sangstagram",
        html:`Hello! Your login secret is <strong>${secret}</strong>.<br/>Copy paste on the app/website to log in`
    };
    return sendMail(email);
};

export const generateToken = id => jwt.sign({id}, process.env.JWT_SECRET);