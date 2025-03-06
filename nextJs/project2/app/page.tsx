import Link from "next/link"

function page() {
  return (
    <div>
     To Do Application 
     <div>
     <Link href={"/signin"}> Signin </Link>
     </div>
     <Link href={"/signup"}> Signup </Link>
    </div>
  )
}

export default page
