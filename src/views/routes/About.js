import React, { Component, useEffect, useState } from "react";
import { dbService } from "../firebase";
import Nweet from "./Nweet";

const About = ({userObj}) => {
    console.log(userObj);
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    // const getNweets = async() => {
    //     const dbNweets = await dbService.collection("nweets").get();
    //     dbNweets.forEach((document) => {
    //         const nweetObject = {
    //             ...document.data(),
    //             id:document.id,
    //             // creatorId: userObj.uid,
    //         };
    //         setNweets((prev) => [nweetObject, ...prev]);
    //     });
    // }

    useEffect(()=>{
        // getNweets();
        dbService.collection("nweets").onSnapshot((snapshot) => {
            const nweetArray = snapshot.docs.map((doc)=> ({
                id:doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArray);
        })
    },[])

    const onSubmit = async(event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
            text: nweet,
            createdAt: Date.now(),
            // creatorId: userObj.uid,
        });
        setNweet("")
    };
    // console.log(props)
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNweet(value);
    };
    // console.log(nweets);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    value={nweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What"
                />
                <input type="submit" value="Nweet"/>
            </form>
            <div>
                {nweets.map((nweet) => (
                    <div key={nweet.id}>
                        <h4>{nweet.text}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default About;