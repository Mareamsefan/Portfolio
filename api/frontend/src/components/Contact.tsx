import { useState } from "react";
import { Student } from "./types";

export default function Contact ({student}: {student:Student}) { 
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [submittedData, setSubmittedData] = useState<{ name: string; message: string } | null>(null);

    const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault(); 
        if (name.trim() === '' || message.trim() === '') {
          alert('Please fill in both fields.');
          return;
        }
        const data = { name, message };
        setSubmittedData(data); 
        setName(''); 
        setMessage('');
      };
    return(
        <section id="contactSection">
        <h1>Contact</h1>
        <button type="submit" onClick={() => { alert(`Email: ${student.email}`);}}>Click me to view the email</button>
        <form id="contactForm" onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Message:
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>
          <button type="submit">Send</button>
        </form>
        {submittedData && (
          <pre id="Json">{JSON.stringify(submittedData, null, 2)}</pre>
        )}
      </section>
    ) 
}