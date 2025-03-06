import { NextRequest, NextResponse } from "next/server";
import  prismaClient  from "../../../lib/db";

export async function POST( req:NextRequest){
    const data = await req.json();


   await prismaClient.user.create({
        data: {
            name: data.name,
            password: data.password
        }
    })
    console.log(data)
    return NextResponse.json({
        message: "you have been signed Up"
    })
}