import { describe, it, expect } from 'vitest';
import { parseWordText } from './wordImport';

// A real reply to the AI prompt, pasted with its line breaks lost.
const GLUED = "hello | salom | phrase | uchrashganda aytiladigan so'z | Hello, how are you today?greet | salomlashmoq | verb | qarshi olmoq | I greet my teacher every morning.good | yaxshi | adjective | ijobiy sifatga ega | Have a good day at school.morning | tong | noun | kunning boshlanish qismi | Morning is a great time to study.welcome | xush kelibsiz | phrase | mehmondo'stlik so'zi | Welcome to our English class.meet | ko'rishmoq | verb | uchrashmoq yoki tanishmoq | I want to meet your new friend.friend | do'st | noun | yaqin odam | He is a very friendly person.smile | jilmaymoq | verb | xursandchilikni ko'rsatmoq | I smile when I see my classmates.happy | baxtli | adjective | xursand kayfiyatli | She is happy to see you here.nice | yoqimli | adjective | yaxshi yoki yaxshi taassurot beruvchi | It is a nice day to walk.hug | quchoqlamoq | verb | quchoqlab ko'rishmoq | Children hug their parents at the door.name | ism | noun | shaxsning oti | My name is Alex, nice to meet you.say | aytmoq | verb | so'zlamoq | Say hello to your parents for me.wave | qo'l silkitmoq | verb | xayrlashganda yoki ko'rishganda imo qilmoq | I wave to my friend on the street.kind | mehribon | adjective | yaxshi xulqli va muloyim | She is a very kind teacher.introduce | tanishtirmoq | verb | o'zini yoki boshqani ko'rsatmoq | Let me introduce my brother to you.pleasure | mamnuniyat | noun | xursandchilik tuyg'usi | It is a pleasure to talk to you.politely | xushmuomalalik bilan | adverb | odob bilan va hurmat saqlab | He always speaks politely to elders.reply | javob bermoq | verb | qayta gapirmoq yoki yozmoq | Please reply to his warm greeting.goodbye | xayr | phrase | ajralishganda aytiladigan so'z | Goodbye, see you next week.";

describe('an AI "|" list pasted without line breaks', () => {
  it('splits it back into one entry per word', () => {
    const rows = parseWordText(GLUED);
    expect(rows).toHaveLength(20);
    expect(rows.every((r) => !r.error && !r.duplicate)).toBe(true);
    expect(rows.map((r) => r.word)).toEqual([
      'hello', 'greet', 'good', 'morning', 'welcome', 'meet', 'friend', 'smile', 'happy', 'nice',
      'hug', 'name', 'say', 'wave', 'kind', 'introduce', 'pleasure', 'politely', 'reply', 'goodbye',
    ]);
    expect(rows[0]).toMatchObject({ translation: 'salom', partOfSpeech: 'phrase', definition: "uchrashganda aytiladigan so'z", example: 'Hello, how are you today?' });
    expect(rows[11]).toMatchObject({ word: 'name', example: 'My name is Alex, nice to meet you.' });
    expect(rows[19]).toMatchObject({ word: 'goodbye', example: 'Goodbye, see you next week.' });
  });

  it('also splits when the glue has a space after the sentence', () => {
    const rows = parseWordText('run | yugurmoq | verb | tez yurmoq | I run. jump | sakramoq | verb | irg\'imoq | I jump high.');
    expect(rows.map((r) => [r.word, r.example])).toEqual([['run', 'I run.'], ['jump', 'I jump high.']]);
  });

  it('leaves a normal one-entry line alone', () => {
    const rows = parseWordText('run | yugurmoq | verb | tez yurmoq | I run fast.Really.');
    expect(rows).toHaveLength(1);
    expect(rows[0].example).toBe('I run fast.Really.');
  });
});
