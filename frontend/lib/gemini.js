import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateResume(userData) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
    Create a professional resume based on the following information:
    
    Personal Information:
    Name: ${userData.personalInfo.name}
    Email: ${userData.personalInfo.email}
    Phone: ${userData.personalInfo.phone}
    Address: ${userData.personalInfo.address}
    LinkedIn: ${userData.personalInfo.linkedin}
    Website: ${userData.personalInfo.website}
    
    Work Experience:
    ${userData.workExperience
      .map(
        (exp) => `
      Company: ${exp.company}
      Position: ${exp.position}
      Duration: ${new Date(exp.startDate).toLocaleDateString()} - ${
          exp.current ? 'Present' : new Date(exp.endDate).toLocaleDateString()
        }
      Responsibilities: ${exp.responsibilities.join(', ')}
      Description: ${exp.description}
    `
      )
      .join('\n')}
    
    Education:
    ${userData.education
      .map(
        (edu) => `
      Institution: ${edu.institution}
      Degree: ${edu.degree}
      Field: ${edu.field}
      Graduation Date: ${new Date(edu.graduationDate).toLocaleDateString()}
      GPA: ${edu.gpa}
      Achievements: ${edu.achievements.join(', ')}
    `
      )
      .join('\n')}
    
    Skills: ${userData.skills.join(', ')}
    
    Achievements: ${userData.achievements.join(', ')}
    
    Format the resume in a professional way with clear sections for Summary, Work Experience, Education, Skills, and Achievements.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

export async function generateCoverLetter(userData, jobTitle, companyName) {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
    Create a professional cover letter for ${
      userData.personalInfo.name
    } applying for the position of ${jobTitle} at ${companyName}.
    
    Use the following information:
    
    Personal Information:
    Name: ${userData.personalInfo.name}
    Email: ${userData.personalInfo.email}
    Phone: ${userData.personalInfo.phone}
    
    Work Experience:
    ${userData.workExperience
      .map(
        (exp) => `
      Company: ${exp.company}
      Position: ${exp.position}
      Duration: ${new Date(exp.startDate).toLocaleDateString()} - ${
          exp.current ? 'Present' : new Date(exp.endDate).toLocaleDateString()
        }
      Key Responsibilities: ${exp.responsibilities.join(', ')}
    `
      )
      .join('\n')}
    
    Skills: ${userData.skills.join(', ')}
    
    Format the cover letter in a professional way with an introduction, body paragraphs highlighting relevant experience and skills, and a conclusion.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}
