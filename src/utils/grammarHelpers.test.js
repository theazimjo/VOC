import { describe, it, expect } from 'vitest';
import { getQuestionsForExercise, getExerciseType } from './grammarHelpers';

const makeQuestions = (n) => Array.from({ length: n }, (_, i) => ({ id: i + 1 }));

describe('getQuestionsForExercise', () => {
  const topic = {
    questions: makeQuestions(25),
    fillBlanks: makeQuestions(20),
    scrambled: makeQuestions(20),
    errorCorrection: makeQuestions(20),
    transform: makeQuestions(20),
    dialogue: makeQuestions(20),
  };

  it('pulls from the questions pool for exercise 1', () => {
    const result = getQuestionsForExercise(topic, '1');
    expect(result.every((q) => topic.questions.includes(q))).toBe(true);
  });

  it('pulls from fillBlanks for exercise 2', () => {
    const result = getQuestionsForExercise(topic, '2');
    expect(result.every((q) => topic.fillBlanks.includes(q))).toBe(true);
  });

  it('pulls from dialogue for exercise 6', () => {
    const result = getQuestionsForExercise(topic, '6');
    expect(result.every((q) => topic.dialogue.includes(q))).toBe(true);
  });

  it('caps the result at 20 questions', () => {
    const result = getQuestionsForExercise(topic, '1');
    expect(result.length).toBe(20);
  });

  it('falls back to the questions pool when the requested exercise type is absent', () => {
    const sparseTopic = { questions: makeQuestions(20) };
    const result = getQuestionsForExercise(sparseTopic, '3');
    expect(result.length).toBe(20);
  });

  it('defaults to exercise 1 for an unparseable exercise id', () => {
    const result = getQuestionsForExercise(topic, 'not-a-number');
    expect(result.every((q) => topic.questions.includes(q))).toBe(true);
  });

  it('returns fewer than 20 when the pool itself is smaller', () => {
    const smallTopic = { questions: makeQuestions(5) };
    expect(getQuestionsForExercise(smallTopic, '1')).toHaveLength(5);
  });
});

describe('getExerciseType', () => {
  it('returns the multiple-choice type for exercise 1', () => {
    expect(getExerciseType(1).name).toBe("Ko'p tanlovli");
  });

  it('returns the dialogue type for exercise 6', () => {
    expect(getExerciseType(6).name).toBe('Muloqot');
  });

  it('falls back to exercise 1 for an unknown id', () => {
    expect(getExerciseType(99)).toEqual(getExerciseType(1));
  });

  it('accepts a string exercise id', () => {
    expect(getExerciseType('2').name).toBe("Bo'shliq to'ldirish");
  });
});
