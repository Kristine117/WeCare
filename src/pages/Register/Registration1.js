import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import moduleCSS from './Register.module.css';

export default function Registration1() {
  const navigate = useNavigate();

  // Initialize initialData from localStorage or set to default
  const [initialData, setInitialData] = useState(() => {
    const storedData = localStorage.getItem("initialData");
    return storedData ? JSON.parse(storedData) : { email: "", password: "", confirmPassword: "" };
  });

  // Update localStorage whenever initialData changes
  useEffect(() => {
    localStorage.setItem("initialData", JSON.stringify(initialData));
  }, [initialData]);

  function collectData(e) {
    e.preventDefault(); // Prevent form submission from reloading the page
  
    const form = e.target;
    const isValid = form.checkValidity(); // HTML5 built-in validation
    
    if (!isValid) {
      // Trigger built-in HTML5 validation behavior
      form.reportValidity(); 
      return; // Stop the function from continuing
    }
  
    // Custom email validation
    const emailBeforeAt = initialData.email.split("@")[0];
    
    // Ensure that the part before "@" is between 10 and 255 characters
    if (emailBeforeAt.length < 10 || emailBeforeAt.length > 255) {
      alert("The part before '@' must be between 10 and 255 characters.");
      return;
    }
  
    // Check if the password and confirm password match
    if (initialData.password !== initialData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    // Proceed with the fetch request after all validations
    fetch(`${process.env.REACT_APP_API_URL}/main/get-all-email`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        // Check if the provided email exists in the fetched emails
        if (data.includes(initialData.email)) {
          alert("Email is already registered. Please use a different email.");
        } else {
          navigate("/registration3");
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInitialData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

    // Automatic scroll to bottom effect
    useEffect(() => {
      const scrollToBottom = () => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: 'smooth'
        });
      };
  
      // Start scrolling after a small delay to allow the component to render
      const scrollTimeout = setTimeout(scrollToBottom, 500);
  
      // Clean up the timeout when the component unmounts
      return () => clearTimeout(scrollTimeout);
    }, []);

  return (
    <div className={moduleCSS.background1}>
      <div className={moduleCSS.loginContainer}>
        <div className={moduleCSS.loginBox}>
          <span className="material-symbols-outlined hover-glow" onClick={() => navigate("/login")}>
            arrow_back
          </span>
          <h3 className="pb-3">Let's create your account</h3>
          <form onSubmit={collectData} className="pr-4" noValidate>
              <div className="form-group">
                <label>Step 1: Account Details</label>
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter Email Address"
                  name="email"
                  value={initialData.email}
                  onChange={handleChange}
                  pattern="^[a-zA-Z0-9._%+-]{10,255}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                  title="The part before @ must be between 10 and 255 characters, and the email must be in a valid format"
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter Password"
                  name="password"
                  value={initialData.password}
                  onChange={handleChange}
                  minLength="9"
                  required
                />
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Re Enter Password"
                  name="confirmPassword"
                  value={initialData.confirmPassword}
                  onChange={handleChange}
                  minLength="9"
                  required
                />
              </div>

              <div className="d-flex justify-content-center">
                <input type="submit" value="Submit and Next" className="btn-get-started" />
              </div>
            </form>

        </div>
      </div>
    </div>
  );
}
