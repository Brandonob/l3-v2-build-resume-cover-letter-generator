'use client';
import { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useToast,
  Skeleton,
  Stack,
} from '@chakra-ui/react';
import ResumeForm from './components/ResumeForm';
import CoverLetterForm from './components/CoverLetterForm';
import DocumentPreview from './components/DocumentPreview';

const CoverLetterSkeleton = () => (
  <Stack spacing={6}>
    {/* Resume Preview Skeleton */}
    <Box className="mb-12">
      <Skeleton height="20px" width="200px" mb={4} />
      <Stack spacing={4}>
        <Skeleton height="400px" />
        <Skeleton height="40px" width="150px" />
      </Stack>
    </Box>

    {/* Cover Letter Form Skeleton */}
    <Box className="mt-12">
      <Skeleton height="24px" width="300px" mb={6} />
      <Stack spacing={6}>
        <Skeleton height="80px" />
        <Skeleton height="80px" />
        <Skeleton height="48px" width="200px" />
      </Stack>
    </Box>
  </Stack>
);

export default function Home() {
  const toast = useToast();
  const [userData, setUserData] = useState(null);
  const [resumeContent, setResumeContent] = useState('');
  const [coverLetterContent, setCoverLetterContent] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleResumeFormSubmit = async (formData) => {
    try {
      setActiveTab(1);
      setUserData(formData);

      const response = await fetch('/api/generate-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate resume');
      }

      const data = await response.json();
      setResumeContent(data.content);

      toast({
        title: 'Resume generated!',
        description: 'Your resume has been successfully generated.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error generating resume:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate resume. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleCoverLetterFormSubmit = async (combinedData) => {
    try {
      setIsGenerating(true);
      const response = await fetch('/api/generate-cover-letter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(combinedData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate cover letter');
      }

      const data = await response.json();
      setCoverLetterContent(data.content);
      setActiveTab(2);

      toast({
        title: 'Cover letter generated!',
        description: 'Your cover letter has been successfully generated.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error generating cover letter:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate cover letter. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadResume = () => {
    const element = document.createElement('a');
    const file = new Blob([resumeContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'resume.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const downloadCoverLetter = () => {
    const element = document.createElement('a');
    const file = new Blob([coverLetterContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'cover-letter.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Box className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <Box className='max-w-7xl mx-auto'>
        <Box className='text-center mb-12'>
          <Heading as='h1' size='2xl' className='text-blue-600 mb-4'>
            Resume & Cover Letter Generator
          </Heading>
          <Text className='text-gray-600 text-xl'>
            Create professional resumes and cover letters in minutes
          </Text>
        </Box>

        <Tabs
          isFitted
          variant='enclosed'
          index={activeTab}
          onChange={setActiveTab}
        >
          <TabList mb='1em'>
            <Tab>Create Resume</Tab>
            <Tab isDisabled={!userData}>Generate Cover Letter</Tab>
            <Tab isDisabled={!coverLetterContent}>View Cover Letter</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <ResumeForm onSubmit={handleResumeFormSubmit} />
            </TabPanel>
            <TabPanel>
              {isGenerating ? (
                <CoverLetterSkeleton />
              ) : resumeContent ? (
                <>
                  <DocumentPreview
                    content={resumeContent}
                    title='Your Resume'
                    onDownload={downloadResume}
                  />

                  <Box className='mt-12'>
                    <Heading size='md' className='text-blue-600 mb-6'>
                      Now, let's create a cover letter
                    </Heading>
                    <CoverLetterForm
                      onSubmit={handleCoverLetterFormSubmit}
                      userData={userData}
                    />
                  </Box>
                </>
              ) : (
                <CoverLetterSkeleton />
              )}
            </TabPanel>

            <TabPanel>
              {coverLetterContent && (
                <DocumentPreview
                  content={coverLetterContent}
                  title='Your Cover Letter'
                  onDownload={downloadCoverLetter}
                />
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}
