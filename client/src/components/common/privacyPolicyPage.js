import React from "react";
import { Link } from "react-router-dom";

function PrivacyPolicyPage() {
  return (
    <div className="text-logoBlue text-xl scroller">
      <Link to="/signup">
        <span className="underline text-2xl">Go back to Sign-up page</span>
      </Link>
      <h1>Application privacy policy for Uinvite app</h1>​
      <p>
        Uinvite is committed to protecting your privacy and ensuring that your
        personal information is handled in a safe and responsible manner. This
        Privacy Policy applies to the Uinvite app and describes how we collect,
        use, and share information about you when you use our app.
      </p>
      ​<h2>1. Information we collect</h2>​
      <p>
        We collect information about you when you use the Uinvite app,
        including:
      </p>
      ​
      <ul>
        <li>
          Information you provide to us: We may collect information you provide
          to us when you create an account, such as your name, email address,
          and phone number.
        </li>
        <li>
          Information we collect automatically: When you use the Uinvite app, we
          may automatically collect certain information about your device and
          your use of the app, such as your device type, IP address, and the
          pages you visit.
        </li>
      </ul>
      ​<h2>2. How we use your information</h2>​
      <p>
        We use the information we collect to provide, maintain, and improve the
        Uinvite app, and to personalize your experience. This includes:
      </p>
      ​
      <ul>
        <li>
          Providing the Uinvite app and its features: We use the information we
          collect to provide you with the Uinvite app and its features, such as
          creating and managing events and invitations.
        </li>
        <li>
          Improving the Uinvite app: We use the information we collect to
          understand how people use the Uinvite app, so we can improve it and
          fix any issues.
        </li>
        <li>
          Personalizing your experience: We may use the information we collect
          to personalize your experience, such as by showing you events and
          invitations that may be of interest to you.
        </li>
      </ul>
      ​<h2>3. Sharing your information</h2>​
      <p>
        We do not sell or share your personal information with third parties for
        their own marketing purposes. We may share your information with third
        parties in the following limited circumstances:
      </p>
      ​
      <ul>
        <li>
          With service providers: We may share your information with third-party
          service providers who perform services on our behalf, such as hosting
          and maintenance, customer support, analytics, and payment processing.
        </li>
        <li>
          With legal requirements: We may disclose your information if required
          to do so by law or if we believe in good faith that such action is
          necessary to comply with legal processes, such as a court order or
          subpoena.
        </li>
        <li>
          With your consent: We may share your information with third parties if
          you have provided your consent to do so.
        </li>
      </ul>
      ​<h2>4. Data retention and security</h2>​
      <p>
        We take reasonable measures to protect the information we collect from
        loss, misuse, and unauthorized access, disclosure, alteration, and
        destruction. However, no security measures are perfect, and we cannot
        guarantee the security of your information.
      </p>
      ​
      <p>
        We will retain your information for as long as necessary to provide the
        Uinvite app and its features, or as necessary to comply with our legal
        obligations, resolve disputes, and enforce our agreements.
      </p>
      ​<h2>5. Your rights and choices</h2>​
      <p>
        You have the right to access, update, or delete your personal
        information at any time. You can also object to the processing of your
        personal information, request that we restrict the processing of your
        personal information, or request the transfer of your personal
        information to another party.
      </p>
      ​
      <p>
        To exercise these rights, please contact us using the information
        provided in the "Contact us" section below.
      </p>
      ​<h2>6. Changes to this Privacy Policy</h2>​
      <p>
        We may update this Privacy Policy from time to time to reflect changes
        to our practices or for other operational, legal, or regulatory reasons.
        We encourage you to review this Privacy Policy periodically for the
        latest information on our privacy practices.
      </p>
      ​<h2>7. Contact us</h2>​
      <p>
        If you have any questions or concerns about this Privacy Policy or our
        privacy practices, please contact us at uinvite45@gmail.com
      </p>
    </div>
  );
}

export default PrivacyPolicyPage;
