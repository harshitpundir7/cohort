export default function authLayout({children}){
    return(
        <div>
            <nav className="border-b p-4">Navigation Bar</nav>
            {children}
        </div>
    )
}