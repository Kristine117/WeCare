import { useContext } from "react";
import "./css/Find.css";
import UserContext from "../UserContext";

export default function Banner() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className="find d-flex">
      <div class="cardFind">
        <div class="card-headerFind">
          <img
            src="https://vignette4.wikia.nocookie.net/harrypotter/images/c/c9/Filch-GOF.jpg/revision/latest?cb=20100418170019"
            alt="We Care"
            className="findImg"
          />
          <p>USERNAME</p>
          <p>RATINGS</p>
          <p>REVIEW 4.5( 34 reviews)</p>
        </div>
        <div class="card-bodyFind">
          <h5 class="card-titleFind">Hi Im Erick Bakonochi!</h5>
          <p class="card-textFind">
            Provide user-friendly tutorials, such as video walkthroughs or
            step-by-step guides, to introduce features they might need
            (scheduling, communication, or logging tasks).
          </p>
          <div className="footerFind">
            <a href="#" class="">
              See more..
            </a>
          </div>
        </div>
      </div>
      <div class="cardFind">
        <div class="card-headerFind">
          <img
            src="https://vignette4.wikia.nocookie.net/harrypotter/images/c/c9/Filch-GOF.jpg/revision/latest?cb=20100418170019"
            alt="We Care"
            className="findImg"
          />
          <p>USERNAME</p>
          <p>RATINGS</p>
          <p>REVIEW 4.5( 34 reviews)</p>
        </div>
        <div class="card-bodyFind">
          <h5 class="card-titleFind">Hi Im Erick Bakonochi!</h5>
          <p class="card-textFind">
            Provide user-friendly tutorials, such as video walkthroughs or
            step-by-step guides, to introduce features they might need
            (scheduling, communication, or logging tasks).
          </p>
          <div className="footerFind">
            <a href="#" class="">
              See more..
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
