import sentenceApi from 'apis/sentenceApi';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setMessage } from 'redux/slices/message.slice';
import SentenceContribution from './index';

function SentenceContributionData() {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (formData) => {
    const { sentence, mean, note, topics } = formData;
    try {
      setSubmitting(true);

      const apiRes = await sentenceApi.postContributeSentence(
        sentence,
        mean,
        note,
        topics,
      );
      if (apiRes.status === 200) {
        dispatch(
          setMessage({
            type: 'success',
            message:
              'Contribute successfully, hope you enjoy learning English with Cosmos',
            duration: 5000,
          }),
        );
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        'Please try again!!!';
      dispatch(
        setMessage({
          type: 'error',
          message,
        }),
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SentenceContribution submitting={submitting} onSubmitForm={handleSubmit} />
  );
}

export default SentenceContributionData;
