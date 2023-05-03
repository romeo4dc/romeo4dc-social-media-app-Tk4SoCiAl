import Image from 'next/image';
import { category } from '../data';
import { useEffect, useState } from 'react';
import { useSocial } from '@/context/Context';
import { Router, useRouter } from 'next/router';
export const LeftBar = () => {
  const [data, setData] = useState(category)
  const [value, setValue] = useState(0)
  const popUpBox = useSocial();
  const router = useRouter();
  
  const { setPopUp, btn } = popUpBox;

  const Func = (e) =>{
    if(e.target.textContent === 'Explore'){
        router.push("/ExploreContent/Explore") 
    }
  }

  return (
    <div className="leftbarcontainer">
      <div className="leftbaruser">
        <Image src={`https://res.cloudinary.com/demo/image/fetch/https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`} alt="randomImage" width={35} height={35}/>
        <div>
          <span>Tushar Kumar</span>
          <span>@tk4</span>
        </div>
      </div>
      <div className="leftbarmenu" onClick={Func}>
        {
          data.map((val, ind) => {
            return (
              <li key={ind} onClick={()=> setValue(ind)} className={value === ind ? "active": undefined}>
              <Image src={`${val.img}`} alt="randomImage" width={20} height={20} />{val.name}
              </li>
            )
          })
        }
      </div>
     { btn && 
      <button className='createpost'  onClick={()=>setPopUp(true)}>Create Post</button>
      }
    </div>
  )
}

