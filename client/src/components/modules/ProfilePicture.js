import React from 'react'
import favicon from '../../../dist/favicon.png'

const ProfilePicture = ({userId}) => {

  let picture;
  if (!userId) {
    picture = <img src={favicon}></img>
  }

  useEffect(() => {
    get("/api/getProfilePicture").then((data) => setProfilePicture(data.profilePicture));
  }, []);
  
  return (
    {picture}
  )
}


export default ProfilePicture;