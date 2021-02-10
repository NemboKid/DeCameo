import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";


//"How it works" in Home Component
const Profiles = () => {
    const history = useHistory();
    const [profiles, setProfiles] = useState([
      {
        id: "charles",
        image: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
        name: "Lars",
        description: "jasså du din jävel",
        profession: "Web Developer",
        price: 3
      },
      {
        id: "peter",
        image: "https://i.pinimg.com/564x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg",
        name: "Peter",
        description: "hallå hallå där",
        profession: "Blockchain",
        price: 5
      },
      {
        id: "mikey",
        image: "https://st.depositphotos.com/1779253/5140/v/600/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg",
        name: "Mike",
        description: "hallå hallå där",
        profession: "CEO CompanyX",
        price: 5
      },
      {
        id: "mikey",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoX6lhTZKutDXlSB0r6828aCbXuxj91BgHUg&usqp=CAU",
        name: "Mike",
        description: "hallå hallå där",
        profession: "UI",
        price: 5
      },
      {
        id: "mikey",
        image: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
        name: "Mike",
        description: "hallå hallå där",
        profession: "UI",
        price: 5
      },
      {
        id: "mikey",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoX6lhTZKutDXlSB0r6828aCbXuxj91BgHUg&usqp=CAU",
        name: "Mike",
        description: "hallå hallå där",
        profession: "UI",
        price: 5
      },
      {
        id: "mikey",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoX6lhTZKutDXlSB0r6828aCbXuxj91BgHUg&usqp=CAU",
        name: "Mike",
        description: "hallå hallå där",
        profession: "UI",
        price: 5
      },
    ]);


    const RenderProfiles = (props) => {
        const { profile } = props;

        return (
            <>
              <div
                className="profile-cont"
                onClick={() => {
                    history.push({
                        pathname: `profile/${profile.id}`,
                        state: {
                            profile: profile
                        }}
                    )}
                  }>
                  <div className="img-wrapper">
                    <img className="profile-img" alt="pic chosen by profile" src={profile.image} />
                    <div className="new-profile-bottom-label">
                      <div className="bottom-label-inner">
                        <span className="first-row">
                          <p>{profile.name}</p>
                        </span>
                        <span className="second-row">
                          <p>{profile.profession}</p>
                          <p>€{profile.price}</p>
                        </span>
                      </div>
                    </div>
                  </div>
              </div>
            </>
          )
    }

    return (
        <div className="profiles-cont">
          <div className="start-body-wrapper scroll-row">
            <h1 className="profiles-title">
              Current Profiles
            </h1>
            <div className="start-body-inner">
              {profiles.length > 0 && profiles.sort((a, b) => b.id - a.id).map((row, i) => <RenderProfiles key={i} profile={row} />)}
            </div>
          </div>
        </div>
    );
}
export default Profiles;
