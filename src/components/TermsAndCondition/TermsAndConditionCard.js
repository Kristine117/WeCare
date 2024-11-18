import React from 'react'
import TC from './TermsCondition.module.css';

const TermsAndConditionCard = ({ onClose, onAgree }) => {
  return (
<div className={`${TC.TcModal}`}>
    <div className=' m-5'>
    <h1 className='my-5'>Terms And Condition</h1>
    <p>Welcome to We Care. By accessing or using our services, you agree to comply with and be bound by the following terms and conditions. Please read these terms carefully before using our services.
    </p>     
    </div>
    
    <div className='ml-5 mt-5'>
        <h4>1. Acceptance of Terms</h4>
        <p>By accessing our website or using our services, you confirm that you:</p>
        <ul className='ml-3'>
            <li>
            <p>Have read, understood, and agreed to these terms and conditions.</p>
            </li>    

            <li>
            <p>Are of legal age or have the permission of a legal guardian to use our services.</p>
            </li>

        </ul>   
    </div>

    <div className='ml-5 mt-5'>
        <h4>2. Services Provided</h4>
        <p>We Care provides Companionship, Housekeeping, Grocery Shopping, Meal Preparation, Transportation Assistance, Medication Reminders, Recreational Activities. These services are subject to change without prior notice.</p> 
    </div>

    <div className='ml-5 mt-5'>
        <h4>3. User Obligations</h4>
        <p>As a user of our services, you agree to:</p>
        <ul className='ml-3'>
            <li>
            <p>Provide accurate and truthful information during registration and maintain its accuracy.</p>
            </li>    

            <li>
            <p>Keep your login credentials secure and confidential.</p>
            </li>

            <li>
            <p>Refrain from any unlawful or unauthorized use of our services.</p>
            </li>

        </ul>   
    </div>

    <div className='ml-5 mt-5'>
        <h4>4. Prohibited Activities</h4>
        <p>You must not:</p>
        <ul className='ml-3'>
            <li>
            <p>Use our services for any fraudulent, illegal, or harmful activities.</p>
            </li>    

            <li>
            <p>Interfere with or disrupt the functioning of our website or services.</p>
            </li>

            <li>
            <p>Reverse-engineer, modify, or attempt to access the source code of our platform.</p>
            </li>

        </ul>   
    </div>

    <div className='ml-5 mt-5'>
        <h4>5. Privacy Policy</h4>
        <p>Your privacy is important to us. By using our services, you acknowledge that you have read and agree to our Privacy Policy, which governs the collection, use, and protection of your personal information.</p> 
    </div>

    <div className='ml-5 mt-5'>
        <h4>6. Intellectual Property</h4>
        <p>All content, logos, trademarks, and materials on our platform are the intellectual property of We Care unless otherwise stated. You may not copy, distribute, or exploit any part of our intellectual property without prior written consent.</p> 
    </div>

    <div className='ml-5 mt-5'>
        <h4>7. Payment Terms</h4>
        <ul className='ml-3'>
            <li>
            <p>All payments made through our platform are secure and processed by authorized payment gateways.</p>
            </li>    

            <li>
            <p>Any disputes related to payments must be reported to programwecare@gmail.com.</p>
            </li>

        </ul>   
    </div>

    <div className='ml-5 mt-5'>
        <h4>8. Termination of Use</h4>
        <p>We reserve the right to suspend or terminate your access to our services at any time, without prior notice, if you violate these terms or engage in activities that harm our platform or users.</p> 
    </div>

    <div className='ml-5 mt-5'>
        <h4>9. Limitation of Liability</h4>
        <p>We Care is not liable for:</p> 
        <ul className='ml-3'>
            <li>
            <p>Any indirect, incidental, or consequential damages arising from your use of our services.</p>
            </li>    

            <li>
            <p>Loss of data, unauthorized access, or service interruptions caused by external factors.</p>
            </li>

        </ul> 
    </div>

    <div className='ml-5 mt-5'>
        <h4>10. Third-Party Links</h4>
        <p>Our platform may contain links to third-party websites or services. We are not responsible for the content, policies, or practices of these external sites.</p> 
    </div>

    <div className='ml-5 mt-5'>
        <h4>11. Modifications to Terms</h4>
        <p>We reserve the right to update or modify these terms at any time. Changes will be posted on this page, and your continued use of our services constitutes acceptance of the revised terms.
        </p> 
    </div>

    <div className='ml-5 mt-5'>
        <h4>12. Governing Law</h4>
        <p>
        These terms and conditions are governed by and construed in accordance with the laws of Philipine Republic. Any disputes shall be resolved under the jurisdiction of Cebu City.
        </p> 
    </div>

    <div className='ml-5 mt-5'>
        <h4>13. Contact Us</h4>
        <p>
        If you have any questions or concerns regarding these terms, please contact us at:
        </p> 
        <ul className='ml-3'>
            <li>
            <p>Email: programwecare@gmail.com</p>
            </li>    
        </ul> 
    </div>

    <div className='ml-5 mt-5'>
        <p>
        By clicking <strong>"I Agree"</strong> , you confirm that you have read, understood, and agree to abide by these Terms and Conditions.
        </p> 
    </div>

    {/* Action Buttons */}
    <div className="mt-5 mb-3 ml-5 d-flex justify-content-start align-content-center">
        <button type="button" 
            className={`btn btn-primary`}
            onClick={onAgree}
        >
            I Agree
        </button>

        <button type="button"
            className={`btn btn-danger ml-3`}
            onClick={onClose}
        >
            I Disagree
        </button>
    </div>
</div>
  )
}

export default TermsAndConditionCard