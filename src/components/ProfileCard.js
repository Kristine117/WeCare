import "./css/ProfileCard.css";



export default function ProfileCard() {

  return (
    <div className="profile-card">
      <div className="profile-head">
        <div className="profile h1-authencated">Recommended</div>
        <div className="profile h1-authencated">
          See more{""}
          <span className="material-symbols-outlined h1-authencated">
            arrow_forward
          </span>
        </div>
      </div>
      <div className="profile-users">
        <div className="card">
          <img
            src="./wecare_logo_smartphone.png"
            alt="We Care"
            width="100px"
            height="auto"
            className="user-picture"
          />
          <div className="card-body">
            <h5 className="card-title text-blue">Ariel Dela Cruz</h5>
          </div>
        </div>
        <div className="card">
          <img
            src="./wecare_logo_smartphone.png"
            alt="We Care"
            width="100px"
            height="auto"
            className="user-picture"
          />
          <div className="card-body">
            <h5 className="card-title text-blue">Alies Guillermo</h5>
          </div>
        </div>
        <div className="card">
          <img
            src="./wecare_logo_smartphone.png"
            alt="We Care"
            width="100px"
            height="auto"
            className="user-picture"
          />
          <div className="card-body">
            <h5 className="card-title text-blue">Cardo Dalisay</h5>
          </div>
        </div>
        <div className="card">
          <img
            src="./wecare_logo_smartphone.png"
            alt="We Care"
            width="100px"
            height="auto"
            className="user-picture"
          />
          <div className="card-body">
            <h5 className="card-title text-blue">Jane Doe</h5>
          </div>
        </div>
        <div className="card">
          <img
            src="./wecare_logo_smartphone.png"
            alt="We Care"
            width="100px"
            height="auto"
            className="user-picture"
          />
          <div className="card-body">
            <h5 className="card-title text-blue">Jane Does</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
