import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts (optional but recommended for professional look)
Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 },
  ]
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Open Sans',
  },
  section: {
    marginBottom: 10,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
    textAlign: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 600,
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 3,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#666',
    paddingBottom: 2,
  },
  workEntry: {
    marginBottom: 8,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  titleLocation: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 600,
  },
  company: {
    fontSize: 11,
  },
  duration: {
    fontSize: 10,
    color: '#666',
    textAlign: 'right',
  },
  description: {
    fontSize: 10,
    marginTop: 3,
  },
  skills: {
    fontSize: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skill: {
    padding: '2 6',
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
  },
  education: {
    marginBottom: 5,
  },
  educationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  achievement: {
    fontSize: 10,
    marginBottom: 3,
  },
});

//test commit

export const ResumePDF = ({ userData }) => {
  // Helper function to check if section has data
  const hasData = (section) => {
    if (!section) return false;
    if (Array.isArray(section)) return section.length > 0;
    if (typeof section === 'object') return Object.keys(section).length > 0;
    return false;
  };

  // Helper function to check if personal info field exists
  const hasPersonalInfo = (field) => {
    return userData.personalInfo?.[field] && userData.personalInfo[field].trim() !== '';
  };

  // Add new helper function for achievements
  const hasValidAchievements = (achievements) => {
    return Array.isArray(achievements) && 
           achievements.length > 0 && 
           achievements.some(achievement => achievement && achievement.trim() !== '');
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header/Personal Info Section */}
        {hasPersonalInfo('name') && (
          <View style={styles.header}>
            <Text style={styles.name}>{userData.personalInfo.name}</Text>
            {/* Only show contact line if either email or phone exists */}
            {(hasPersonalInfo('email') || hasPersonalInfo('phone')) && (
              <Text style={styles.contactInfo}>
                {hasPersonalInfo('email') && userData.personalInfo.email}
                {hasPersonalInfo('email') && hasPersonalInfo('phone') && ' | '}
                {hasPersonalInfo('phone') && userData.personalInfo.phone}
              </Text>
            )}
            {/* Address */}
            {hasPersonalInfo('address') && (
              <Text style={styles.contactInfo}>{userData.personalInfo.address}</Text>
            )}
            {/* Links */}
            {(hasPersonalInfo('linkedin') || hasPersonalInfo('website')) && (
              <Text style={styles.contactInfo}>
                {hasPersonalInfo('linkedin') && `LinkedIn: ${userData.personalInfo.linkedin}`}
                {hasPersonalInfo('linkedin') && hasPersonalInfo('website') && ' | '}
                {hasPersonalInfo('website') && `Website: ${userData.personalInfo.website}`}
              </Text>
            )}
          </View>
        )}

        {/* Work Experience Section */}
        {hasData(userData.workExperience) && userData.workExperience.some(exp => exp.position && exp.company) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {userData.workExperience
              .filter(exp => exp.position && exp.company)
              .map((exp, index) => (
                <View key={index} style={styles.workEntry}>
                  <View style={styles.titleRow}>
                    <View style={styles.titleLocation}>
                      <Text style={styles.jobTitle}>{exp.position}</Text>
                      <Text style={styles.company}>{exp.company}</Text>
                    </View>
                    <Text style={styles.duration}>
                      {new Date(exp.startDate).toLocaleDateString()} - 
                      {exp.current ? 'Present' : new Date(exp.endDate).toLocaleDateString()}
                    </Text>
                  </View>
                  {exp.description && (
                    <Text style={styles.description}>{exp.description}</Text>
                  )}
                  {hasData(exp.responsibilities) && (
                    <View style={{ marginTop: 3 }}>
                      {exp.responsibilities.map((resp, idx) => (
                        <Text key={idx} style={styles.description}>• {resp}</Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
          </View>
        )}

        {/* Education Section */}
        {hasData(userData.education) && userData.education.some(edu => edu.degree && edu.institution) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {userData.education
              .filter(edu => edu.degree && edu.institution)
              .map((edu, index) => (
                <View key={index} style={styles.education}>
                  <View style={styles.educationRow}>
                    <View style={styles.titleLocation}>
                      <Text style={styles.jobTitle}>
                        {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                      </Text>
                      <Text style={styles.company}>{edu.institution}</Text>
                    </View>
                    <Text style={styles.duration}>
                      {edu.graduationDate && new Date(edu.graduationDate).toLocaleDateString()}
                      {edu.gpa && ` | GPA: ${edu.gpa}`}
                    </Text>
                  </View>
                  {hasData(edu.achievements) && (
                    <View style={{ marginTop: 3 }}>
                      {edu.achievements.map((achievement, idx) => (
                        <Text key={idx} style={styles.description}>• {achievement}</Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
          </View>
        )}

        {/* Skills Section*/}
        {hasData(userData.skills) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skills}>
              {userData.skills
                .filter(skill => skill && skill.trim() !== '')
                .map((skill, index) => (
                  <Text key={index} style={styles.skill}>
                    {skill}
                  </Text>
                ))}
            </View>
          </View>
        )}

        {/* Achievements Section */}
        {hasValidAchievements(userData.achievements) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            {userData.achievements
              .filter(achievement => achievement && achievement.trim() !== '')
              .map((achievement, index) => (
                <Text key={index} style={styles.achievement}>
                  • {achievement}
                </Text>
              ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ResumePDF;