import React from 'react'
import TC from './TermsCondition.module.css';

const DataPrivacyCard = ({ onClose, onAgree }) => {
  return (
    <div className={`${TC.TcModal}`}>
        <div className=' m-5'>
            <div  className='mb-5'>
            <h1 className='my-5'>Data Privacy Statement</h1>

            <p>At <strong>We Care</strong>, your privacy is of utmost importance to us. This Data Privacy Statement explains how we collect, use, store, and protect your personal information in compliance with applicable laws and regulations.</p>
            </div>

            <div>
                <h4>1. Information We Collect</h4>
                <p>We collect the following types of personal information:</p>
                <ul className='ml-3'>
                    <li>
                    <p><strong>Personal Identification Information: </strong>Name, address, contact details (email, phone number), and other identifying information.</p>
                    </li>    

                    <li>
                    <p><strong>Account Information: </strong>Login credentials, user IDs, and passwords.</p>
                    </li>

                    <li>
                    <p><strong>Transactional Data: </strong>Payment information, billing details, and purchase history.</p>
                    </li>

                    <li>
                    <p><strong>Usage Data: </strong>Data about how you interact with our website, mobile applications, or services, including IP addresses, browser types, and device information.
                    </p>
                    </li>
                </ul>   
            </div>

            <div className='mt-5'>
                <h4>2. How We Use Your Information</h4>
                <p>We use your personal information for the following purposes:</p>
                <ul className='ml-3'>
                    <li>
                    <p>To provide and maintain our services.</p>
                    </li>

                    <li>
                    <p>To process transactions, billing, and payments.</p>
                    </li>

                    <li>
                    <p>To improve and personalize your experience.</p>
                    </li>

                    <li>
                    <p>To communicate important updates, such as policy changes or service-related announcements.</p>
                    </li>

                    <li>
                    <p>To comply with legal obligations, such as tax and accounting requirements.</p>
                    </li>
                </ul> 
            </div>

            <div className='mt-5'>
                <h4>3. How We Protect Your Information</h4>

                <p>We implement robust security measures to protect your personal data, including:</p>
                <ul className='ml-3'>
                    <li>
                    <p>Data encryption during transmission (e.g., SSL/TLS).</p>
                    </li>

                    <li>
                    <p>Secure storage of personal data with restricted access.</p>
                    </li>

                    <li>
                    <p>Regular audits and vulnerability assessments.</p>
                    </li>
                </ul> 
                <p>
                    While we strive to protect your data, no security system is infallible. We encourage you to safeguard your account by using strong passwords and limiting access to your devices.
                </p>
            </div>

            <div className='mt-5'>
                <h4>4. Sharing Your Information</h4>

                <p>We do not sell, rent, or trade your personal information. However, we may share your data with:</p>
                <ul className='ml-3'>
                    <li>
                    <p><strong>Service Providers: </strong>For tasks such as payment processing, email delivery, and customer support.</p>
                    </li>

                    <li>
                    <p><strong>Legal Authorities: </strong>When required by law, court order, or legal process.</p>
                    </li>

                    <li>
                    <p><strong>Business Transfers: </strong>In the event of a merger, acquisition, or sale of assets.</p>
                    </li>
                </ul> 
            </div>

            <div className='mt-5'>
                <h4>5. Your Rights</h4>

                <p>You have the right to:</p>
                <ul className='ml-3'>
                    <li>
                    <p><strong>Access: </strong>Request a copy of your personal data.</p>
                    </li>

                    <li>
                    <p><strong>Correction: </strong>Update or correct inaccuracies in your data.</p>
                    </li>

                    <li>
                    <p><strong>Deletion: </strong>Request the deletion of your personal information, subject to legal or contractual obligations.</p>
                    </li>

                    <li>
                    <p><strong>Opt-Out: </strong>Withdraw consent for marketing communications or specific data processing activities.</p>
                    </li>
                </ul> 
                <p>
                To exercise these rights, contact us at programwecare@gmail.com.
                </p>
            </div>

            <div className='mt-5'>
                <h4>6. Retention of Data</h4>

                <p>
                We retain your personal information only as long as necessary to fulfill the purposes outlined in this statement, comply with legal requirements, or resolve disputes.
                </p>
            </div>

            <div className='mt-5'>
                <h4>7. Cookies and Tracking Technologies</h4>

                <p>
                Our website may use cookies and similar technologies to enhance your experience. You can manage your cookie preferences through your browser settings.
                </p>
            </div>

            <div className='mt-5'>
                <h4>8. Updates to this Privacy Statement</h4>

                <p>
                We may update this Privacy Statement from time to time. Any changes will be communicated through our website or other appropriate channels.
                </p>
            </div>

            <div className='mt-5'>
                <h4>9. Contact Us</h4>

                <p>
                If you have questions or concerns about this Privacy Statement or our data practices, please contact us:
                </p>
                <ul className='ml-3'>
                    <li>
                    <p><strong>Email: </strong>programwecare@gmail.com</p>
                    </li>
                </ul>
                <p>
                By using our services, you agree to the terms outlined in this Privacy Statement. Thank you for trusting us with your personal information.
                </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 d-flex justify-content-start align-content-center">
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
    </div>
  )
}

export default DataPrivacyCard