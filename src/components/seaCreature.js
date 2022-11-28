import React, {useState, useEffect} from "react";
import "../style.css";
import left from "./media/leftArrow.png";
import right from "./media/rightArrow.png";

const SeaCreatures = () => {
    const [id, setID] = useState(1);
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [availability, setAvailability] = useState("");
    const [speed, setSpeed] = useState("")
    const [shadow, setShadow] = useState("");
    const [price, setPrice] = useState();
    const [hemisphere, setHemisphere] = useState("northern");

    const [allSea, setAllSea] = useState();

    // Defines whether the certain sea creature is active in a certain month based on hemisphere
    const activeMonthHelper = (month, availability) => {
        // Check whether the given month is current month
        let outcome = "";
        const date = new Date();
        const currentMonth = date.getMonth() + 1;
        if (month == currentMonth) outcome = "currentMonth";
        // Check whether the fish is active in the given month
        if (typeof availability[`month-array-${hemisphere}`] !== 'undefined') {
            if (availability.isAllYear) return outcome + " " + "active";
            else {
                if (availability[`month-array-${hemisphere}`].includes(month)) return outcome + " " + "active";
                else return outcome;
            }
        }
    }

    // Defines whether the certain sea creature is active in a certain hour
    const activeHourHelper = (hour, availability) => {
        if (typeof availability['time-array'] !== 'undefined') {
            const length = availability['time-array'].length;
            if (availability.isAllDay) {
                if (hour == 0) return "activeHourStart";
                else if (hour == 23) return "activeHourEnd";
                else return "activeHour";
            } else if (availability['time-array'].includes(hour)) {
                if (availability['time-array'][0] == hour) return "activeHourStart";
                else if (availability['time-array'][length - 1] == hour) return "activeHourEnd";
                else return "activeHour";
            }
        }
    }
    
    const getSea = async () => {
        const response = await fetch(`https://acnhapi.com/v1/sea/${id}`)
        const result = await response.json()
        setName(result.name["name-USen"])
        setImage(result['image_uri'])
        setAvailability(result.availability);
        setSpeed(result.speed);
        setPrice(result.price);
        setShadow(result.shadow);

        const responseAllSea = await fetch(`https://acnhapi.com/v1/sea`)
        const resultAllSea = await responseAllSea.json()
        setAllSea(resultAllSea);

    }

    // put all Sea info into an array
    const seaArray = [];
    for (const property in allSea) {
        seaArray.push(allSea[property]);
    }

    useEffect(() => {
        getSea()
    }, [id])

    return <>
        <div className="detailPage">
            <div className="seperator">
                <div className="basic sea">
                    <div id="name">{name}</div>
                    <div id="image">
                        <img src={image}/>
                    </div>
                </div>
                <div className="picker">
                    <img src={left} alt="a left-pointing arrow" onClick={() => {setID(id <= 1 ? 1 : id - 1)}}/>
                    <img src={right} alt="a right-pointing arrow" onClick={() => {setID(id >= 40 ? 40 : id + 1)}}/>
                </div>
            </div>
            
            <div className="facts">
                <div className="seasonal">
                    <div id="seasonTitle">
                        <div className="property">Seasonality</div>
                        {/* Users can choose their hemisphere */}
                        <div className="hemisphere">
                            <button className={hemisphere == "northern" ? "currentHemisphere" : ""} onClick={() => {setHemisphere("northern")}}>Northern</button>
                            <button className={hemisphere == "northern" ? "" : "currentHemisphere"} onClick={() => {setHemisphere("southern")}}>Southern</button>
                        </div>
                    </div>
                    <div id="seasonChart">
                        <div className="row">
                            <div className="month"><div className={activeMonthHelper(1, availability)}>Jan.</div></div>
                            <div className="month"><div className={activeMonthHelper(2, availability)}>Feb.</div></div>
                            <div className="month"><div className={activeMonthHelper(3, availability)}>Mar.</div></div>
                            <div className="month"><div className={activeMonthHelper(4, availability)}>Apr.</div></div>
                        </div>
                        <div className="row">
                            <div className="month"><div className={activeMonthHelper(5, availability)}>May.</div></div>
                            <div className="month"><div className={activeMonthHelper(6, availability)}>Jun.</div></div>
                            <div className="month"><div className={activeMonthHelper(7, availability)}>Jul.</div></div>
                            <div className="month"><div className={activeMonthHelper(8, availability)}>Aug.</div></div>
                        </div>
                        <div className="row last">
                            <div className="month"><div className={activeMonthHelper(9, availability)}>Sep.</div></div>
                            <div className="month"><div className={activeMonthHelper(10, availability)}>Oct.</div></div>
                            <div className="month"><div className={activeMonthHelper(11, availability)}>Nov.</div></div>
                            <div className="month"><div className={activeMonthHelper(12, availability)}>Dec.</div></div>
                        </div>
                    </div>
                </div>
                <div className="activeHours">
                    <div id="activeHoursTitle"><span className="property">Active Hours:</span>{availability.time == "" ? "All Day" : availability.time}</div>
                    <div id="time">
                        <div id="am">AM</div>
                        <div id="pm">PM</div>
                    </div>
                    <div id="timeInterval">
                        <div>12</div>
                        <div>6</div>
                        <div>12</div>
                        <div>6</div>
                    </div>
                    <div id="timeline">
                        <div className="big"></div>
                        <div className="small"></div>
                        <div className="small"></div>
                        <div className="medium"></div>
                        <div className="small"></div>
                        <div className="small"></div>
                        <div className="big"></div>
                        <div className="small"></div>
                        <div className="small"></div>
                        <div className="medium"></div>
                        <div className="small"></div>
                        <div className="small"></div>
                        <div className="big"></div>
                        <div className="small"></div>
                        <div className="small"></div>
                        <div className="medium"></div>
                        <div className="small"></div>
                        <div className="small"></div>
                        <div className="big"></div>
                        <div className="small"></div>
                        <div className="small"></div>
                        <div className="medium"></div>
                        <div className="small"></div>
                        <div className="small"></div>
                        <div className={activeHourHelper(0, availability)} id="zero"></div>
                        <div className={activeHourHelper(1, availability)} id="one"></div>
                        <div className={activeHourHelper(2, availability)} id="two"></div>
                        <div className={activeHourHelper(3, availability)} id="three"></div>
                        <div className={activeHourHelper(4, availability)} id="four"></div>
                        <div className={activeHourHelper(5, availability)} id="five"></div>
                        <div className={activeHourHelper(6, availability)} id="six"></div>
                        <div className={activeHourHelper(7, availability)} id="seven"></div>
                        <div className={activeHourHelper(8, availability)} id="eight"></div>
                        <div className={activeHourHelper(9, availability)} id="nine"></div>
                        <div className={activeHourHelper(10, availability)} id="ten"></div>
                        <div className={activeHourHelper(11, availability)} id="eleven"></div>
                        <div className={activeHourHelper(12, availability)} id="twlve"></div>
                        <div className={activeHourHelper(13, availability)} id="thirteen"></div>
                        <div className={activeHourHelper(14, availability)} id="fourteen"></div>
                        <div className={activeHourHelper(15, availability)} id="fifteen"></div>
                        <div className={activeHourHelper(16, availability)} id="sixteen"></div>
                        <div className={activeHourHelper(17, availability)} id="seventeen"></div>
                        <div className={activeHourHelper(18, availability)} id="eighteen"></div>
                        <div className={activeHourHelper(19, availability)} id="ninteen"></div>
                        <div className={activeHourHelper(20, availability)} id="twenty"></div>
                        <div className={activeHourHelper(21, availability)} id="twentyOne"></div>
                        <div className={activeHourHelper(22, availability)} id="twentyTwo"></div>
                        <div className={activeHourHelper(23, availability)} id="twentyThree"></div>
                    </div>
                </div>
                <div id="speed"><span className="property">Speed</span>{speed}</div>
                <div id="shadow"><span className="property">Shadow Size</span>{shadow}</div>
                <div id="price"><span className="property">Price</span>{price}</div>
            </div>
        </div>

        <div className="collection">
            {
            seaArray.map((sea, index) => (
                <div key={index}><img src={sea['icon_uri']} alt="icon of sea" onClick={() => {setID(index + 1)}}/></div>
            ))
            }
        </div>
    </>
}

export default SeaCreatures;