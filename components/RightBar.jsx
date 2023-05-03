import Image from "next/image"
export const RightBar = () => {
  return (
    <div className='rightbar'>
    <div className="top">
    <span style={{color:"#000000", fontWeight:'600',padding:'0em .5em'}}>Messages</span>
      <div className="searchsec">
        <Image src={`assets/search.svg`} height={15} width={15} alt="" />
        <input type="text" placeholder="Search messages" />
      </div>
      <div className="categories">
      <div className="category">
        <li>Primary</li>
        <li>General</li>
        <li>Requests(7)</li>
        </div>
        <div className="users">
            <div className="user">
                <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} height={30} width={30} alt="randomImage" />
                <div>
                    <span>Edem Quist</span>
                    <span>just woke up bruh</span>
                </div>
            </div>
            <div className="user">
                <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} height={30} width={30} alt="randomImage" />
                <div>
                    <span>Franca Deila</span>
                    <span>Received bruh. Thanks!</span>
                </div>
            </div>
            <div className="user">
                <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} height={30} width={30} alt="randomImage" />
                <div>
                    <span>Jane Doe</span>
                    <span>ok</span>
                </div>
            </div>
            <div className="user">
                <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} height={30} width={30} alt="randomImage" />
                <div>
                    <span>Daniella Jackson</span>
                    <span>2 new messages</span>
                </div>
            </div>
            <div className="user">
                <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} height={30} width={30} alt="randomImage" />
                <div>
                    <span>Juliet Makarey</span>
                    <span>lol u right</span>
                </div>
            </div>
            <div className="user">
                <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} height={30} width={30} alt="randomImage" />
                <div>
                    <span>Chantel Msiza</span>
                    <span>Birthday Tomorrow!</span>
                </div>
            </div>
        </div>
      </div>
      </div>
      <span style={{fontWeight:'600', color:'#808080'}}>Requests</span>
      <div className="requests">
        <div className="req">
            <div className="user">
            <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} height={30} width={30} alt="randomImage" />
                <div>
                    <span>Chantel Msiza</span>
                    <span>Birthday Tomorrow!</span>
                </div>
            </div>
            <div className="choice">
                <button>Accept</button>
                <button>Cancel</button>
            </div>
        </div>
        <div className="req">
            <div className="user">
            <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} height={30} width={30} alt="randomImage" />
                <div>
                    <span>Chantel Msiza</span>
                    <span>Birthday Tomorrow!</span>
                </div>
            </div>
            <div className="choice">
                <button>Accept</button>
                <button>Cancel</button>
            </div>
        </div>
        <div className="req">
            <div className="user">
            <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} height={30} width={30} alt="randomImage" />
                <div>
                    <span>Chantel Msiza</span>
                    <span>Birthday Tomorrow!</span>
                </div>
            </div>
            <div className="choice">
                <button>Accept</button>
                <button>Cancel</button>
            </div>
        </div>
      </div>
    </div>
  )
}