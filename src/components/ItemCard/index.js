import './style.css';
import { FaCommentsDollar } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import { TbBath } from "react-icons/tb";
import { BiArea } from "react-icons/bi";

const ItemCard = ({data}) => {

  return (
    <div className="col-md-4 col-sm-6" style={{marginBottom: 25}}>
      <div className="cardContainer">
        <div className="imageContainer">
          <img src={data.image} className="image" alt="property" />
        </div>
        <div style={{padding: 15}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
              <span className="price">{`$${data.price}`}</span>
              <span className="month">/ month</span>
            </div>
            {data.popular && (
              <div className="popular">
                <FaCommentsDollar style={{marginRight: 6}} />
                <span>Popular</span>
              </div>
            )}
          </div>
          <div className="name">
            {data.name}
          </div>
          <div className="address">
            {data.address + ', ' + data.location}
          </div>
          <div className="divider" />
          <div className="infoContainer">
            <div className="info">
              <IoBedOutline className="infoIcon" />
              <span className="infoText">{data.beds} Beds</span>
            </div>
            <div className="info">
              <TbBath className="infoIcon" />
              <span className="infoText">{data.bathrooms} Bathrooms</span>
            </div>
            <div className="info">
              <BiArea className="infoIcon" />
              <span className="infoText">{data.area} m<sup>2</sup></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;