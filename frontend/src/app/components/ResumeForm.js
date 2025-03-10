'use client';
import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Divider,
  Textarea,
  HStack,
  IconButton,
  Text,
  useToast,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

export default function ResumeForm({ onSubmit }) {
  const toast = useToast();
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      website: '',
    },
    workExperience: [
      {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        responsibilities: [''],
      },
    ],
    education: [
      {
        institution: '',
        degree: '',
        field: '',
        graduationDate: '',
        gpa: '',
        achievements: [''],
      },
    ],
    skills: [''],
    achievements: [''],
  });

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      personalInfo: {
        ...formData.personalInfo,
        [name]: value,
      },
    });
  };

  const handleWorkExperienceChange = (index, field, value) => {
    const newWorkExperience = [...formData.workExperience];
    newWorkExperience[index][field] = value;
    setFormData({
      ...formData,
      workExperience: newWorkExperience,
    });
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...formData.education];
    newEducation[index][field] = value;
    setFormData({
      ...formData,
      education: newEducation,
    });
  };

  const handleArrayItemChange = (section, index, value) => {
    const newArray = [...formData[section]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [section]: newArray,
    });
  };

  const addArrayItem = (section) => {
    setFormData({
      ...formData,
      [section]: [...formData[section], ''],
    });
  };

  const removeArrayItem = (section, index) => {
    if (formData[section].length > 1) {
      const newArray = [...formData[section]];
      newArray.splice(index, 1);
      setFormData({
        ...formData,
        [section]: newArray,
      });
    } else {
      toast({
        title: 'Cannot remove',
        description: 'You need at least one item in this section',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const addWorkExperience = () => {
    setFormData({
      ...formData,
      workExperience: [
        ...formData.workExperience,
        {
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
          responsibilities: [''],
        },
      ],
    });
  };

  const removeWorkExperience = (index) => {
    if (formData.workExperience.length > 1) {
      const newWorkExperience = [...formData.workExperience];
      newWorkExperience.splice(index, 1);
      setFormData({
        ...formData,
        workExperience: newWorkExperience,
      });
    } else {
      toast({
        title: 'Cannot remove',
        description: 'You need at least one work experience',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        {
          institution: '',
          degree: '',
          field: '',
          graduationDate: '',
          gpa: '',
          achievements: [''],
        },
      ],
    });
  };

  const removeEducation = (index) => {
    if (formData.education.length > 1) {
      const newEducation = [...formData.education];
      newEducation.splice(index, 1);
      setFormData({
        ...formData,
        education: newEducation,
      });
    } else {
      toast({
        title: 'Cannot remove',
        description: 'You need at least one education entry',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const addResponsibility = (workIndex) => {
    const newWorkExperience = [...formData.workExperience];
    newWorkExperience[workIndex].responsibilities.push('');
    setFormData({
      ...formData,
      workExperience: newWorkExperience,
    });
  };

  const removeResponsibility = (workIndex, respIndex) => {
    if (formData.workExperience[workIndex].responsibilities.length > 1) {
      const newWorkExperience = [...formData.workExperience];
      newWorkExperience[workIndex].responsibilities.splice(respIndex, 1);
      setFormData({
        ...formData,
        workExperience: newWorkExperience,
      });
    } else {
      toast({
        title: 'Cannot remove',
        description: 'You need at least one responsibility',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleResponsibilityChange = (workIndex, respIndex, value) => {
    const newWorkExperience = [...formData.workExperience];
    newWorkExperience[workIndex].responsibilities[respIndex] = value;
    setFormData({
      ...formData,
      workExperience: newWorkExperience,
    });
  };

  const addEducationAchievement = (eduIndex) => {
    const newEducation = [...formData.education];
    newEducation[eduIndex].achievements.push('');
    setFormData({
      ...formData,
      education: newEducation,
    });
  };

  const removeEducationAchievement = (eduIndex, achieveIndex) => {
    if (formData.education[eduIndex].achievements.length > 1) {
      const newEducation = [...formData.education];
      newEducation[eduIndex].achievements.splice(achieveIndex, 1);
      setFormData({
        ...formData,
        education: newEducation,
      });
    } else {
      toast({
        title: 'Cannot remove',
        description: 'You need at least one achievement',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEducationAchievementChange = (eduIndex, achieveIndex, value) => {
    const newEducation = [...formData.education];
    newEducation[eduIndex].achievements[achieveIndex] = value;
    setFormData({
      ...formData,
      education: newEducation,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box
      as='form'
      onSubmit={handleSubmit}
      className='max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md'
    >
      <VStack spacing={8} align='stretch'>
        {/* Personal Information */}
        <Box>
          <Heading size='md' mb={4} className='text-blue-600'>
            Personal Information
          </Heading>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel className='text-black'>Full Name</FormLabel>
              <Input
                name='name'
                value={formData.personalInfo.name}
                onChange={handlePersonalInfoChange}
                placeholder='John Doe'
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel className='text-black'>Email</FormLabel>
              <Input
                className='border-[1px] border-gray-300'
                name='email'
                type='email'
                value={formData.personalInfo.email}
                onChange={handlePersonalInfoChange}
                placeholder='john.doe@example.com'
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel className='text-black'>Phone</FormLabel>
              <Input
                name='phone'
                value={formData.personalInfo.phone}
                onChange={handlePersonalInfoChange}
                placeholder='(123) 456-7890'
              />
            </FormControl>

            <FormControl>
              <FormLabel className='text-black'>Address</FormLabel>
              <Input
                name='address'
                value={formData.personalInfo.address}
                onChange={handlePersonalInfoChange}
                placeholder='123 Main St, City, State, ZIP'
              />
            </FormControl>

            <FormControl>
              <FormLabel className='text-black'>LinkedIn</FormLabel>
              <Input
                name='linkedin'
                value={formData.personalInfo.linkedin}
                onChange={handlePersonalInfoChange}
                placeholder='linkedin.com/in/johndoe'
              />
            </FormControl>

            <FormControl>
              <FormLabel className='text-black'>Website</FormLabel>
              <Input
                name='website'
                value={formData.personalInfo.website}
                onChange={handlePersonalInfoChange}
                placeholder='johndoe.com'
              />
            </FormControl>
          </VStack>
        </Box>

        <Divider />

        {/* Work Experience */}
        <Box>
          <Heading size='md' mb={4} className='text-blue-600'>
            Work Experience
          </Heading>

          {formData.workExperience.map((exp, index) => (
            <Box
              key={index}
              p={4}
              mb={4}
              borderWidth='1px'
              borderRadius='lg'
              className='bg-gray-50'
            >
              <HStack justify='space-between' mb={2}>
                <Heading size='sm'>Position {index + 1}</Heading>
                <IconButton
                  icon={<DeleteIcon />}
                  colorScheme='red'
                  variant='ghost'
                  onClick={() => removeWorkExperience(index)}
                  aria-label='Remove work experience'
                />
              </HStack>

              <VStack spacing={4} align='stretch'>
                <FormControl isRequired>
                  <FormLabel className='text-black'>Company</FormLabel>
                  <Input
                    value={exp.company}
                    onChange={(e) =>
                      handleWorkExperienceChange(
                        index,
                        'company',
                        e.target.value
                      )
                    }
                    placeholder='Company Name'
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel className='text-black'>Position</FormLabel>
                  <Input
                    value={exp.position}
                    onChange={(e) =>
                      handleWorkExperienceChange(
                        index,
                        'position',
                        e.target.value
                      )
                    }
                    placeholder='Job Title'
                  />
                </FormControl>

                <HStack>
                  <FormControl isRequired>
                    <FormLabel className='text-black'>Start Date</FormLabel>
                    <Input
                      type='date'
                      value={exp.startDate}
                      onChange={(e) =>
                        handleWorkExperienceChange(
                          index,
                          'startDate',
                          e.target.value
                        )
                      }
                    />
                  </FormControl>

                  <FormControl isRequired={!exp.current}>
                    <FormLabel className='text-black'>End Date</FormLabel>
                    <Input
                      type='date'
                      value={exp.endDate}
                      onChange={(e) =>
                        handleWorkExperienceChange(
                          index,
                          'endDate',
                          e.target.value
                        )
                      }
                      isDisabled={exp.current}
                    />
                  </FormControl>
                </HStack>

                <FormControl display='flex' alignItems='center'>
                  <Input
                    type='checkbox'
                    checked={exp.current}
                    onChange={(e) =>
                      handleWorkExperienceChange(
                        index,
                        'current',
                        e.target.checked
                      )
                    }
                    className='w-4 h-4 mr-2'
                  />
                  <FormLabel mb='0'>I currently work here</FormLabel>
                </FormControl>

                <FormControl>
                  <FormLabel className='text-black'>Description</FormLabel>
                  <Textarea
                    value={exp.description}
                    onChange={(e) =>
                      handleWorkExperienceChange(
                        index,
                        'description',
                        e.target.value
                      )
                    }
                    placeholder='Brief description of your role'
                  />
                </FormControl>

                <Box>
                  <FormLabel className='text-black'>Responsibilities</FormLabel>
                  {exp.responsibilities.map((resp, respIndex) => (
                    <HStack key={respIndex} mb={2}>
                      <Input
                        value={resp}
                        onChange={(e) =>
                          handleResponsibilityChange(
                            index,
                            respIndex,
                            e.target.value
                          )
                        }
                        placeholder='Responsibility'
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        colorScheme='red'
                        variant='ghost'
                        onClick={() => removeResponsibility(index, respIndex)}
                        aria-label='Remove responsibility'
                      />
                    </HStack>
                  ))}
                  <Button
                    leftIcon={<AddIcon />}
                    onClick={() => addResponsibility(index)}
                    size='sm'
                    colorScheme='blue'
                    variant='ghost'
                  >
                    Add Responsibility
                  </Button>
                </Box>
              </VStack>
            </Box>
          ))}

          <Button
            leftIcon={<AddIcon />}
            onClick={addWorkExperience}
            colorScheme='blue'
            variant='outline'
            w='full'
          >
            Add Work Experience
          </Button>
        </Box>

        <Divider />

        {/* Education */}
        <Box>
          <Heading size='md' mb={4} className='text-blue-600'>
            Education
          </Heading>

          {formData.education.map((edu, index) => (
            <Box
              key={index}
              p={4}
              mb={4}
              borderWidth='1px'
              borderRadius='lg'
              className='bg-gray-50'
            >
              <HStack justify='space-between' mb={2}>
                <Heading size='sm'>Education {index + 1}</Heading>
                <IconButton
                  icon={<DeleteIcon />}
                  colorScheme='red'
                  variant='ghost'
                  onClick={() => removeEducation(index)}
                  aria-label='Remove education'
                />
              </HStack>

              <VStack spacing={4} align='stretch'>
                <FormControl isRequired>
                  <FormLabel className='text-black'>Institution</FormLabel>
                  <Input
                    value={edu.institution}
                    onChange={(e) =>
                      handleEducationChange(
                        index,
                        'institution',
                        e.target.value
                      )
                    }
                    placeholder='University/College Name'
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel className='text-black'>Degree</FormLabel>
                  <Input
                    value={edu.degree}
                    onChange={(e) =>
                      handleEducationChange(index, 'degree', e.target.value)
                    }
                    placeholder="Bachelor's, Master's, etc."
                  />
                </FormControl>

                <FormControl>
                  <FormLabel className='text-black'>Field of Study</FormLabel>
                  <Input
                    value={edu.field}
                    onChange={(e) =>
                      handleEducationChange(index, 'field', e.target.value)
                    }
                    placeholder='Computer Science, Business, etc.'
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel className='text-black'>Graduation Date</FormLabel>
                  <Input
                    type='date'
                    value={edu.graduationDate}
                    onChange={(e) =>
                      handleEducationChange(
                        index,
                        'graduationDate',
                        e.target.value
                      )
                    }
                  />
                </FormControl>

                <FormControl>
                  <FormLabel className='text-black'>GPA</FormLabel>
                  <Input
                    value={edu.gpa}
                    onChange={(e) =>
                      handleEducationChange(index, 'gpa', e.target.value)
                    }
                    placeholder='3.8/4.0'
                  />
                </FormControl>

                <Box>
                  <FormLabel className='text-black'>Achievements</FormLabel>
                  {edu.achievements.map((achievement, achieveIndex) => (
                    <HStack key={achieveIndex} mb={2}>
                      <Input
                        value={achievement}
                        onChange={(e) =>
                          handleEducationAchievementChange(
                            index,
                            achieveIndex,
                            e.target.value
                          )
                        }
                        placeholder='Achievement'
                      />
                      <IconButton
                        icon={<DeleteIcon />}
                        colorScheme='red'
                        variant='ghost'
                        onClick={() =>
                          removeEducationAchievement(index, achieveIndex)
                        }
                        aria-label='Remove achievement'
                      />
                    </HStack>
                  ))}
                  <Button
                    leftIcon={<AddIcon />}
                    onClick={() => addEducationAchievement(index)}
                    size='sm'
                    colorScheme='blue'
                    variant='ghost'
                  >
                    Add Achievement
                  </Button>
                </Box>
              </VStack>
            </Box>
          ))}

          <Button
            leftIcon={<AddIcon />}
            onClick={addEducation}
            colorScheme='blue'
            variant='outline'
            w='full'
          >
            Add Education
          </Button>
        </Box>

        <Divider />

        {/* Skills */}
        <Box>
          <Heading size='md' mb={4} className='text-blue-600'>
            Skills
          </Heading>

          {formData.skills.map((skill, index) => (
            <HStack key={index} mb={2}>
              <Input
                value={skill}
                onChange={(e) =>
                  handleArrayItemChange('skills', index, e.target.value)
                }
                placeholder='Skill'
              />
              <IconButton
                icon={<DeleteIcon />}
                colorScheme='red'
                variant='ghost'
                onClick={() => removeArrayItem('skills', index)}
                aria-label='Remove skill'
              />
            </HStack>
          ))}

          <Button
            leftIcon={<AddIcon />}
            onClick={() => addArrayItem('skills')}
            size='sm'
            colorScheme='blue'
            variant='ghost'
          >
            Add Skill
          </Button>
        </Box>

        <Divider />

        {/* Achievements */}
        <Box>
          <Heading size='md' mb={4} className='text-blue-600'>
            Achievements
          </Heading>

          {formData.achievements.map((achievement, index) => (
            <HStack key={index} mb={2}>
              <Input
                value={achievement}
                onChange={(e) =>
                  handleArrayItemChange('achievements', index, e.target.value)
                }
                placeholder='Achievement'
              />
              <IconButton
                icon={<DeleteIcon />}
                colorScheme='red'
                variant='ghost'
                onClick={() => removeArrayItem('achievements', index)}
                aria-label='Remove achievement'
              />
            </HStack>
          ))}

          <Button
            leftIcon={<AddIcon />}
            onClick={() => addArrayItem('achievements')}
            size='sm'
            colorScheme='blue'
            variant='ghost'
          >
            Add Achievement
          </Button>
        </Box>

        <Button type='submit' colorScheme='blue' size='lg' className='mt-6'>
          Generate Resume & Cover Letter
        </Button>
      </VStack>
    </Box>
  );
}
