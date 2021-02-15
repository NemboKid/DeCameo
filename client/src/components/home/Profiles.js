import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";


//"How it works" in Home Component
const Profiles = (props) => {
    const history = useHistory();
    const [fakeProfiles, setProfiles] = useState([
      {
        id: 0,
        image: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
        name: "Lars",
        description: "jasså du din jävel",
        title: "Web Developer",
        charity: "0xC7e797350Bb6bD64d4274C3DBf3f9F6c6E67081b",
        test: true
      },
      {
        id: 1,
        image: "https://i.pinimg.com/564x/d9/56/9b/d9569bbed4393e2ceb1af7ba64fdf86a.jpg",
        name: "Peter",
        description: "hallå hallå där",
        title: "Blockchain",
        charity: "0xC7e797350Bb6bD64d4274C3DBf3f9F6c6E67081b",
        test: true
      },
      {
        id: 2,
        image: "https://st.depositphotos.com/1779253/5140/v/600/depositphotos_51405259-stock-illustration-male-avatar-profile-picture-use.jpg",
        name: "Mike",
        description: "hallå hallå där",
        title: "CEO CompanyX",
        charity: 2,
        test: true
      },
      {
        id: 3,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoX6lhTZKutDXlSB0r6828aCbXuxj91BgHUg&usqp=CAU",
        name: "Fred",
        description: "hallå hallå där",
        title: "UX",
        charity: 1,
        test: true
      },
      {
        id: 4,
        image: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
        name: "Sam",
        description: "hallå hallå där",
        title: "Accountant",
        charity: 3,
        test: true
      },
      {
        id: 5,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoX6lhTZKutDXlSB0r6828aCbXuxj91BgHUg&usqp=CAU",
        name: "Mike",
        description: "hallå hallå där",
        title: "UI",
        charity: 1,
        test: true
      },
      {
        id: 6,
        image: "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg",
        name: "Sven",
        description: "hallå hallå där",
        title: "HODLer",
        charity: 4,
        test: true
      },
    ]);
    const [celebs, setCelebs] = useState([]);
    const [celebCount, setCelebCount] = useState(null);

    useEffect(() => {
        try {
            getProfiles();
        } catch (err) {
            console.log(err);
            history.push("/");
        }
    }, [props.appState.contract.methods]);

    const getProfiles = async () => {
        let count;
        let profiles = [];
        if (props.appState.contract.methods) {
            count = await props.appState.contract.methods.celebCount().call();
            setCelebCount(count);
            console.log("count:: ", count);
            // const newCeleb = await props.appState.contract.methods.registeredCelebrities(0).call();
            // console.log("newCeleb: ", newCeleb);
        }
        if (count > 0) {
            for (var i = 0; i <= count - 1; i++) {
                console.log("i: ", i);
                const newCeleb = await props.appState.contract.methods.registeredCelebs(i).call();
                console.log(newCeleb);
                profiles.push(newCeleb);
            }
        } else {
            profiles = fakeProfiles;
        }
        console.log("profiles: ", profiles);
        setCelebs(profiles);
    }


    const RenderProfiles = (props) => {
        const { profile } = props;
        console.log(profile);

        return (
            <>
              <div
                className="profile-cont"
                onClick={() => {
                    history.push({
                        pathname: `profile/${profile.id}`,
                        state: {
                            profile: profile,
                        }}
                    )}
                  }>
                  <div className="img-wrapper">
                    <img className="profile-img" alt="pic chosen by profile" src={celebCount > 0 ? (profile.image ? `https://ipfs.infura.io/ipfs/${profile.image}` : "https://cdn1.iconfinder.com/data/icons/random-115/24/person-512.png") : profile.image} />
                    <div className="new-profile-bottom-label">
                      <div className="bottom-label-inner">
                        <span className="first-row">
                          <p>{profile.name}</p>
                        </span>
                        <span className="second-row">
                          <p>{profile.title}</p>
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
              {celebs.length > 0 && celebs.sort((a, b) => b.id - a.id).map((row, i) => <RenderProfiles key={i} profile={row} />)}
            </div>
          </div>
        </div>
    );
}
export default Profiles;
