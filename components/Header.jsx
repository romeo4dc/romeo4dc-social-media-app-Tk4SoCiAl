import Image from "next/image"
export const Header=()=>{
    return(
     <nav className="navbar">
        <span>Tk4SoCiAl</span>
        <div className="inputsec">
            <Image src={`assets/search.svg`} height={20} width={20}  alt="" />
            <input type="text" placeholder="Search for creators, inspirations, and projects"/>
        </div>
        <div className="login">
        <button>Create</button>
        <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} height={33} width={33} alt="" />
        </div>
     </nav>
    )
 }