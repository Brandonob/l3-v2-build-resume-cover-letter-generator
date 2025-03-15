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
  useToast,
} from '@chakra-ui/react';

export default function CoverLetterForm({ onSubmit, userData }) {
  const toast = useToast();
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.jobTitle || !formData.companyName) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Combine the form data with userData
    const combinedData = {
      ...userData,
      jobTitle: formData.jobTitle,
      companyName: formData.companyName
    };

    onSubmit(combinedData);
  };

  return (
    <Box
      as='form'
      onSubmit={handleSubmit}
      className='max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md'
    >
      <VStack spacing={6} align='stretch'>
        <Heading size='md' className='text-blue-600'>
          Cover Letter Information
        </Heading>

        <FormControl isRequired>
          <FormLabel>Job Title</FormLabel>
          <Input
            name='jobTitle'
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder='Software Engineer'
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Company Name</FormLabel>
          <Input
            name='companyName'
            value={formData.companyName}
            onChange={handleChange}
            placeholder='Acme Inc.'
          />
        </FormControl>

        <Button type='submit' colorScheme='blue' size='lg'>
          Generate Cover Letter
        </Button>
      </VStack>
    </Box>
  );
}
