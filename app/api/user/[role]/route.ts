import { UserModel } from "@/model";
import { NextResponse } from "next/server";

export const GET = async () => {
        const users = await UserModel.find({}, { account_role: 1 }); 
        const accountRolesSet = new Set();

        users.forEach(user => {
            if (user.account_role) {
                accountRolesSet.add(user.account_role); 
            }
        });

        const accountRoles = Array.from(accountRolesSet); 

        return NextResponse.json({ accountRoles }, { status: 200 });
    
};
