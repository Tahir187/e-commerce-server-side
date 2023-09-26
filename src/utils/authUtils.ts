import bcrypt from "bcrypt";

export const hashPassword = async (password: string) =>{
    try {
        const saltRound: number = 10;
        const hashedPassword: string = await bcrypt.hash(password, saltRound);
        return hashedPassword;
    } catch (error) {
        console.log(`Error ${error}`)
    }
}

export const comparePassword = async (password: string, hashedPassword: string) =>{
    return bcrypt.compare(password, hashedPassword);
}