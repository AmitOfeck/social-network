export const handle401Error = async(asyncFnResult:Promise<any>):Promise<any> => {
    try{
        return await asyncFnResult;
    }catch(err:any){
        console.log(err)
        if(err.status == 401){
            console.log("need to generate new token")
        }else{
            throw err;
        }
    }
}