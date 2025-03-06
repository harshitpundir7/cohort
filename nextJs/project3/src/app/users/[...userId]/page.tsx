export default function page({params}:any){
    return(
        <div>
            {JSON.stringify(params.userId)}
        </div>
    )
}