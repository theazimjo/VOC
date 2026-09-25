import sys
import json
import fitz
import re

sys.stdout.reconfigure(encoding='utf-8')

# Construct full Chapter 1 object matching exact textbook text of HEALTH.pdf

ch1_data = {
    "title": "Choosing Wellness",
    "pages": [
        # Page 1
        [
            {
                "type": "heading",
                "text": "Chapter 1 · Choosing Wellness"
            },
            {
                "type": "activity",
                "text": "As You Read, Think About — what is meant by the terms health and wellness. How your behavior affects your level of wellness. How you can start to improve your health now."
            },
            {
                "type": "p",
                "text": "You and your friend swoop and glide over the lake like two brightly colored birds. The air is clean and cold, and the ice glistens white against the blue of the sky and the dark green of the pines. The blades of your skates sparkle as you cut a graceful pattern on the glassy surface of the ice. The feeling of all your muscles working together as you gather speed is exhilarating. Your cheeks are tingling with the cold and the excitement. Your whole body is alive with energy and good health."
            },
            {
                "type": "p",
                "text": "Everyone wants to feel good and to have special moments like these. The choices you make every day contribute to your ability to enjoy life to its fullest. In this chapter, you'll find out how you can choose and maintain the particular life style that suits you — a life style that will keep you feeling fit, energetic, and happy. The choices you make every day affect your health now and in the future."
            }
        ],
        # Page 2
        [
            {
                "type": "heading",
                "text": "1. What Are Health and Wellness?"
            },
            {
                "type": "p",
                "text": "What is health? How can I tell if I am healthy? Can I control my own health? How can I influence my future health? You may have just begun to ask yourself questions like these. At one time you might have said that a healthy person is anyone who does not have a cold or some other illness. Now that you are older, you may feel that this definition does not include all the things that cause you to feel well or to be healthy."
            },
            {
                "type": "heading",
                "text": "Aspects of Health"
            },
            {
                "type": "p",
                "text": "The term health has come to have a wider meaning than it used to. It no longer means just the absence of illness. Health is now used — and will be used in this book — to refer to the well-being of your body, your mind, and your relationships with other people. These types of well-being are called physical health, mental health, and social health. The concept of health that includes all three of these aspects is called wellness."
            },
            {
                "type": "p",
                "text": "When you are physically healthy, you are able to carry out everyday tasks without becoming overly tired. You have enough energy to enjoy leisure activities and to meet emergencies. If you are mentally healthy, you like yourself for your achievements, and you learn from your mistakes. You can cope with the demands of life and adjust to new situations. When you have healthy social relationships, you get along well with others. You have friends, and you are capable of loving relationships. You respect the rights of others, and you know how to give and accept help."
            },
            {
                "type": "p",
                "text": "It is easy to see how the three aspects of wellness are related. When you are ill or facing many problems and pressures, your relationships with your friends and family may suffer. When you are coming down with the flu, for example, you may get upset if you are asked to do the dishes or take out the garbage. If you are worried about an exam in a difficult subject, you may get a headache or stomachache. If you are lonely and have few friends, you probably do not feel good about yourself. You may even feel tired or overeat because of your unhappiness."
            },
            {
                "type": "activity",
                "text": "Check Your Wellness — Your level of wellness is high if you can answer yes to the following questions. 1. Do you eat a well-balanced diet and avoid foods high in fat, salt, and sugar? 2. Do you participate in vigorous exercise at least three times a week? 3. Is your weight within the normal range for your age, height, and sex? 4. Do you feel good about yourself? 5. Do you set aside time each day to relax? 6. Do you avoid drugs, alcohol, and tobacco? 7. Do you get about eight hours of restful sleep each night? 8. Do you have close relatives and friends you can talk to? 9. Can you express your feelings in healthful ways? 10. Do you use a seat belt and avoid driving with a person who is using drugs or alcohol? 11. Do you try to lessen your exposure to air, water, and noise pollution? 12. Are your decisions based on your own values and goals, rather than those of others?"
            }
        ],
        # Page 3
        [
            {
                "type": "p",
                "text": "This view of wellness as a combination of physical, mental, and social well-being is also known as a holistic concept of health. Holistic means whole, and here it refers to the connections among these three aspects of health as they affect the whole person. People with a holistic view of wellness are aware of and work to improve all three aspects of their health. They regard wellness as an important goal, the result they want to achieve through their actions."
            },
            {
                "type": "p",
                "text": "Another way to express the holistic concept of wellness is with the term quality of life. Quality of life refers to how satisfying and rewarding a person's life is. Lately, this term has received more attention in our society. One reason for this increasing emphasis can be found in the length and conditions of life that people have now come to expect. Since 1900, the life expectancy of Americans has increased by about 27 years. For much of the history of the world, just staying alive and active until age 47 was quite an accomplishment. This is still true in some parts of the world today. You can imagine that people living in areas of drought and food shortages are not concerned about what we call quality of life. They are too busy just trying to stay alive. In this country and other countries, however, many people are concerned about how they will feel and what they can accomplish and enjoy during these added years of life expectancy. These people are concerned not only about feeling good in the present but also about planning for a lifetime of wellness."
            },
            {
                "type": "heading",
                "text": "What Determines Health and Wellness"
            },
            {
                "type": "p",
                "text": "What are some of the factors that influence your wellness and life expectancy? Can you control or influence any of these factors?"
            },
            {
                "type": "p",
                "text": "To answer these questions, consider another set of statistics comparing 1900 to the present. The three leading causes of death in 1900 were not the same as the leading causes of death today. The leading causes of death then were diseases that could be passed from one person to another: pneumonia and influenza, tuberculosis, and diseases of the stomach and intestines."
            }
        ],
        # Page 4
        [
            {
                "type": "p",
                "text": "In contrast, today's leading causes of death are diseases that are strongly influenced by your individual life style, the way you choose to live your life."
            },
            {
                "type": "p",
                "text": "As you will see, the way you choose to live your life strongly influences the quality of your life, both now and in the future. Of course, some other factors also influence your health and wellness. These include heredity, environment, and culture, but even these factors are affected to some extent by your life-style decisions."
            },
            {
                "type": "heading",
                "text": "Heredity"
            },
            {
                "type": "p",
                "text": "To some extent, your level of health is already determined at the time you are born. Heredity is all the traits that are passed biologically from parent to child. Your skin color, eye color, height, and hair texture are all inherited traits."
            },
            {
                "type": "p",
                "text": "You can also inherit risk factors for certain diseases. For example, a tendency toward high blood pressure, diabetes, or breast cancer may run in some families. Having a family history of high blood pressure does not mean that you will automatically develop the condition, but your risk of developing high blood pressure is greater than that of a person with no family history of the disease."
            },
            {
                "type": "p",
                "text": "Except in a small number of cases, heredity does not prevent a person from enjoying a healthy life. For most people, the life-style choices they make every day are far more important than heredity in maintaining, harming, or improving their wellness. People with an inherited risk of high blood pressure, for example, can lessen their risk by maintaining a normal weight, exercising regularly, and reducing the amount of salt in their diet. Many people with an inherited risk factor live long and healthy lives in spite of this inherited tendency. Although heredity affects health, life-style choices are often more important in determining overall wellness."
            }
        ],
        # Page 5
        [
            {
                "type": "heading",
                "text": "Environment"
            },
            {
                "type": "p",
                "text": "Your environment is all your surroundings and the influences they have on you. To be healthy, everyone needs a healthful physical environment, or physical surroundings. You know that climate, extreme heat or cold, and extremely dry or damp air can affect your wellness. It is also true that air pollution, water pollution, radiation, and even loud noise can injure your health. If you are aware of environmental hazards, you can take steps to protect yourself. You can avoid swimming in polluted water, wear a sunscreen for protection against the sun's rays, and always keep your radio's volume at less-than-harmful levels."
            },
            {
                "type": "p",
                "text": "You can also take steps to make your environment healthier. Everyone should be aware of the dangers of a polluted environment and help to limit or decrease pollution. That includes disposing of waste materials correctly, bicycling or walking short distances instead of driving, and recycling paper goods, cans, and bottles. Some teenagers are part of environmental watch groups that keep track of air and water cleanliness in their communities."
            },
            {
                "type": "p",
                "text": "Your physical environment includes the environment indoors as well as outdoors. Your home, school, and workplace are part of your physical environment. Cigarette smoking in public places and disease-causing organisms in restaurant food are some indoor hazards of the physical environment. Your own knowledge and behavior can help make your physical environment safer. How could you and your friends contribute to improving the environment of your school cafeteria or a local park?"
            },
            {
                "type": "heading",
                "text": "Social Environment"
            },
            {
                "type": "p",
                "text": "Your environment is made up of more than your physical surroundings. The people around you — your family, friends, and other people you spend time with — make up another part of your environment, your social environment."
            },
            {
                "type": "p",
                "text": "When you were a child, your parents were the major part of your social environment. They taught you to speak and to communicate in other ways. They strongly influenced your feelings about yourself and your ideas of how to get along with other people. In addition, they probably taught you health habits that are so basic you do not even think about them anymore. Washing your hands before eating or fixing a meal, for example, may have become routine; but now you understand that these habits help to prevent the spread of germs."
            },
            {
                "type": "sidebar",
                "text": "Health Frontiers: Psychoneuroimmunology: The Mind-Body Connection — Do emotions and thoughts play a role in helping the body ward off disease? The new field of psychoneuroimmunology (PNI) suggests they might. PNI researchers are now exploring the two-way connection between the brain and the immune system, the body's defense against disease. The brain's network of nerves releases many chemicals, some of which depend on mood. These chemicals bind directly to the disease-fighting cells of the immune system and influence how the cells behave. Immune cells are more active when a person's mood is good than when he or she is depressed. The immune cells send chemical messages back to the brain. These chemicals affect sleep, body temperature, heart rate, and mood. PNI supports common beliefs. A person with a positive attitude combats disease better than someone who has 'lost the will to live.' Good health and a positive outlook tend to reinforce each other. While wellness may not be 'all in your mind,' PNI has found that there is a close connection. What role does mood play in fighting disease?"
            }
        ],
        # Page 6
        [
            {
                "type": "p",
                "text": "As you have grown older, your social environment has expanded to include your neighbors and schoolmates. Your teachers, relatives, friends, and those involved in the community activities you participate in are an important part of your social environment."
            },
            {
                "type": "p",
                "text": "You have probably heard a lot of talk about peer pressure. Traditionally, the word peers has meant equals, those people who are in the same situation as you. Today, it is often used to mean your friends, or a larger group of acquaintances your own age. The friends you select from among your acquaintances can have an important effect on your level of wellness. Friends who practice unhealthful behaviors can put a lot of pressure on you to do the same. It is sometimes difficult to stand up to that kind of pressure. Selecting friends who choose healthful habits and life styles makes it easier for you to choose wellness."
            },
            {
                "type": "heading",
                "text": "Culture"
            },
            {
                "type": "p",
                "text": "Your social environment is only one part of your culture. Culture is all the ideas, customs, and ways of living that characterize a particular group of people. That group may be a nation, a region of a country, or an ethnic group. Culture includes accents and food preferences, attitudes and manners."
            }
        ],
        # Page 7
        [
            {
                "type": "p",
                "text": "Sometimes you are not aware of the characteristics of your own culture until you come in contact with another culture. You probably do not think you have an accent until you visit a part of the country where people speak differently. In some cultures, it is rude to take off your shoes when visiting someone else's house; in other cultures it is rude not to. In some cultures, people eat little or no meat; in others, meat is central to the diet. This is just one example of how cultural differences can affect your health. Can you think of other examples?"
            },
            {
                "type": "p",
                "text": "Sometimes, you may get \"mixed messages\" from your culture. For example, our culture emphasizes the value of health and fitness. At the same time, it suggests that unhealthful behaviors, such as smoking and drinking, are fun and part of a healthful life style. You have probably seen advertisements with young, healthy-looking people trying to promote products that are not really good for your health. The culture in which you live can affect your health in many ways. Sorting out cultural influences will help you make healthful choices."
            },
            {
                "type": "review",
                "title": "Section 1 Review",
                "sections": [
                    {
                        "heading": "What Have You Learned?",
                        "items": [
                            {
                                "prompt": "1. What are the three aspects of wellness?",
                                "answer": "Physical health, mental health, and social health."
                            },
                            {
                                "prompt": "2. What is a holistic view of health?",
                                "answer": "A view of health that considers the interconnections between physical, mental, and social well-being as they affect the whole person."
                            },
                            {
                                "prompt": "3. How are the three leading causes of death today different from the three leading causes of death in 1900?",
                                "answer": "In 1900, the leading causes of death were infectious diseases (pneumonia, tuberculosis, stomach diseases). Today, they are chronic diseases strongly influenced by life style (heart disease, cancer, stroke)."
                            },
                            {
                                "prompt": "4. What four factors influence a person's level of wellness? Which factor can a person control most?",
                                "answer": "Heredity, physical environment, social environment, and culture/life style. Life-style decisions can be controlled most."
                            }
                        ]
                    },
                    {
                        "heading": "What Do You Think?",
                        "items": [
                            {
                                "prompt": "5. What are two ways you could improve your physical health? Your mental health? Your social health?",
                                "answer": "Physical: eat a balanced diet, exercise regularly. Mental: set aside relaxation time, learn from mistakes. Social: communicate openly, spend quality time with family/friends."
                            }
                        ]
                    }
                ]
            }
        ],
        # Page 8
        [
            {
                "type": "heading",
                "text": "2. You and Your Health"
            },
            {
                "type": "p",
                "text": "If there were just a few painless habits you could choose to practice that would lead to a long and healthy life, of course you would practice them. Even if there were no absolute guarantee of good health, just a greater probability of it, the choice would still be worthwhile."
            },
            {
                "type": "p",
                "text": "Such a choice does not come from a fairy-tale land of magic potions that protects the user from disaster. It is a real choice you can make in your daily life. One way to judge the changes in your health that your daily life-style choices can make — for the better as well as for the worse — is to use the Illness-Wellness continuum."
            },
            {
                "type": "heading",
                "text": "The Illness-Wellness Continuum"
            },
            {
                "type": "p",
                "text": "Remember the last time you were coming down with the flu? You could feel it beginning, even before you showed any symptoms. As the flu progressed, you felt worse and worse. Then, as you recovered, you felt a little better each day until you were back to normal. You can picture health-related changes in your life — from wellness to illness and back again — as a continuum. A continuum is a gradual progression through many stages between one extreme and another."
            },
            {
                "type": "p",
                "text": "Continuums can represent other health-related changes in your life. How would you use a continuum to express the gradual improvement in your fitness when you start an exercise program? How could a continuum show the changes in a person who is developing a chronic disease?"
            },
            {
                "type": "p",
                "text": "Your overall wellness also can be illustrated on a continuum. This sliding scale is called the Illness-Wellness continuum. Look at Figure 1-7. Notice that on the Illness-Wellness continuum, you can move in either direction. As you move toward the left, you move toward illness or early death. As you move toward the right, you move toward wellness. Notice also that there is a midpoint on the continuum. At this neutral point, you are neither ill nor well."
            },
            {
                "type": "p",
                "text": "At one time, as you learned earlier, many people in this country were satisfied to stay at the midpoint of the Illness-Wellness continuum. They were less concerned about avoiding illness than about improving the quality of their lives. Today, achieving a higher level of wellness and a better quality of life is possible for many of the people in this country."
            }
        ],
        # Page 9
        [
            {
                "type": "heading",
                "text": "Risk Behaviors"
            },
            {
                "type": "p",
                "text": "Look again at the Illness-Wellness continuum. You can see that a risk behavior, or an action that increases the chance of a harmful outcome, moves you toward the illness-early death end of the continuum. You are probably aware of many risks to your health and do your best to avoid them. You know, for example, that wearing a seat belt in a car will reduce your risk of injury in case of an accident. If you wear a seat belt, you are practicing a healthful behavior. If you do not, you are taking a risk that moves you toward the illness-early death end of the continuum. Perhaps thinking about the continuum will help you become aware of some of the unnecessary risks you take."
            },
            {
                "type": "p",
                "text": "Most activities have varying degrees of risk. For example, if you exercise vigorously without warming up first, you risk pulling a muscle. If you ride a motorcycle without a helmet, you risk serious injury and death."
            },
            {
                "type": "p",
                "text": "Sometimes, risks are worth taking if there is a benefit greater than the possible harm. Downhill skiing involves some risk of injury, but many people decide that this enjoyable and healthful activity is worth the risk. They also may lessen their risks while skiing. It is always worthwhile to think carefully about any activities that involve risks before deciding to do them."
            }
        ],
        # Page 10
        [
            {
                "type": "p",
                "text": "Not all risk behaviors involve immediate threats to your physical safety. Eating an unbalanced diet is a risk behavior. As you may know, the typical fast-food meal contains a great deal of salt, fat, and sugar. Eating a meal like this too frequently may cause you to put on too much weight. Living on a diet of fast food may lead to more serious, long-term health problems, such as cancer and heart disease. How far along the Illness-Wellness continuum do you think one fast-food meal per week would move you? What about two meals per day? You will learn more about the effects of dietary risk factors in Chapters 8 and 9."
            },
            {
                "type": "p",
                "text": "Another set of risks to your wellness involves mental and social health. Keeping your feelings 'bottled up' inside can risk both your mental and social well-being. You will learn more about the healthy expression of emotions in Chapter 2 and about communication skills in Chapter 5."
            },
            {
                "type": "heading",
                "text": "Moving Along the Continuum"
            },
            {
                "type": "p",
                "text": "To achieve a better quality of life, you need to know about, choose, and practice behaviors that move you toward the wellness end of the continuum. How do you decide which behaviors will promote wellness? How do you go about changing a risk behavior to a healthful behavior?"
            },
            {
                "type": "p",
                "text": "Making behavior changes involves a process that includes several steps. First, you must become aware of your current behaviors. You should be aware of your own particular conditions and needs. Awareness is the first step toward making healthful choices and decisions. The second step is acquiring the knowledge you need to promote your own wellness."
            },
            {
                "type": "p",
                "text": "The remainder of this chapter, and the chapters that follow, will show you how to gain an awareness of your own health, how to acquire and evaluate health-related knowledge, and how to decide which behaviors best promote your health. Finally, you will learn how to turn your decisions into action."
            }
        ],
        # Page 11
        [
            {
                "type": "heading",
                "text": "Awareness"
            },
            {
                "type": "p",
                "text": "How do you become aware of your own level of wellness? In some cases, you know when you are not well. You know when your ankle hurts or when you have a sunburn. You know when you are angry, worried, or depressed, or when you are not getting along with your family or friends."
            },
            {
                "type": "p",
                "text": "Other medical problems do not show up so readily. You should have regular check-ups with a doctor and dentist to evaluate your health. Your doctor can check your height, weight, and blood pressure to determine if you are at risk for certain health problems because of your physical condition. Your answers to questions about your diet, exercise, and sleep habits will provide additional information. Using a questionnaire like the 'Check Your Wellness' feature at the beginning of this chapter should give you a good start. How well did you do on that check-up?"
            },
            {
                "type": "p",
                "text": "You may even discuss some of your feelings with your doctor. If you are depressed, anxious, or having trouble getting along with others, your doctor may suggest ways to resolve these problems."
            },
            {
                "type": "p",
                "text": "Learning what questions to ask of your doctor and of yourself is an important step toward health awareness."
            },
            {
                "type": "heading",
                "text": "Knowledge"
            },
            {
                "type": "p",
                "text": "Knowledge about health is growing every day. New discoveries and research studies add to what is already known about how the body works and how to prevent illness. Having accurate, up-to-date knowledge about health is important to your wellness. Knowing that high-fat diets are linked to heart disease and cancer can help you choose a healthful diet. Knowing the safety rules of a particular sport can keep you from getting hurt."
            },
            {
                "type": "p",
                "text": "Knowing facts about health is not the same as using knowledge to promote your wellness. Understanding the health risks of a particular fad diet is important to people who may try it. You need to be able to sort out the knowledge that might apply to your life."
            }
        ],
        # Page 12
        [
            {
                "type": "p",
                "text": "Some sources of health information are more reliable than others. Which is a better source of knowledge, an advertisement for a quick weight-loss diet or a study of weight loss in a scholarly journal? While the answer to that question is obvious, the value of other sources of information may not be as easy to determine."
            },
            {
                "type": "p",
                "text": "This book gives you a good foundation of health-related knowledge. It also suggests how you can evaluate other sources of health information. Updating your knowledge of things that affect your wellness is a lifelong responsibility."
            },
            {
                "type": "heading",
                "text": "Behavior Choices"
            },
            {
                "type": "p",
                "text": "Even with awareness and knowledge, it is not always easy to decide on the best choice of action. In the earlier discussion of risks, the action of running across a highway presents a clear risk, but the skiing example is less clear-cut. Most people would agree that you should not run across a busy highway; but people disagree about whether downhill skiing is worth the risk. Similarly, a person may know about the extreme risk of drinking and driving, but still face a tough decision about whether to ride with a driver who has been drinking."
            },
            {
                "type": "p",
                "text": "Awareness of your own skiing ability is essential in this example. Knowledge of safety rules and proper equipment is also important. Knowing your own values is equally important. Your values are the standards and beliefs that are most important to you. They help you clarify what you want out of life. Your values are formed through your experiences with your family, your religion, and your community. They are influenced by your friends and your culture. Your values help you decide what is right and wrong for you. When you face a tough decision, clarifying your values will help you choose the alternative that is best for you. Your decisions not only affect you, they affect your family and your friends."
            },
            {
                "type": "p",
                "text": "The DECIDE process described in the Health Skills on page 16 provides a step-by-step procedure to help you make hard decisions easier. Look at the DECIDE process and think about how you might use it to make healthful decisions."
            },
            {
                "type": "heading",
                "text": "Skills"
            },
            {
                "type": "p",
                "text": "What would you think of a baseball team that spent all its time thinking and learning about baseball, but never practiced playing the game? You would probably think that the team would not win many games. To win, you have to practice. To have good health, you must apply the healthful decisions you have made."
            }
        ],
        # Page 13
        [
            {
                "type": "p",
                "text": "One quality a successful baseball player needs is skill. Awareness of natural talent, knowledge of the game, and a good choice of bat are not much good without the skill to hit a curve ball or lay down a bunt. How do baseball players develop new skills? They usually begin by observing and analyzing their current behavior. Next, they make changes. Then, there is practice and more practice."
            },
            {
                "type": "p",
                "text": "Just like the baseball player who worked to change his or her swing, you may have to practice to change a habit. A habit is a pattern of behavior that has become automatic and hard to change. Brushing your teeth after meals or putting on your seat belt in a car are examples of healthful habits. Eating a high-fat snack after school or watching television instead of exercising are unhealthful habits. You can change unhealthful habits and build new, healthful ones, but it takes time and practice. The Health Skills in this book will help you to develop the skills you need to put decisions for wellness into action."
            },
            {
                "type": "review",
                "title": "Section 2 Review",
                "sections": [
                    {
                        "heading": "What Have You Learned?",
                        "items": [
                            {
                                "prompt": "1. What is the Illness-Wellness continuum?",
                                "answer": "A sliding scale illustrating a person's overall level of wellness, ranging from illness/early death on the left to high-level wellness on the right."
                            },
                            {
                                "prompt": "2. What is a risk behavior? Give an example of an immediate risk and a long-term risk.",
                                "answer": "An action that increases the chance of a harmful outcome. Immediate risk: riding a motorcycle without a helmet. Long-term risk: living on a fast-food diet high in fat and salt."
                            },
                            {
                                "prompt": "3. What steps should a person take to move toward the wellness side of the Illness-Wellness continuum?",
                                "answer": "Gain awareness of current habits, acquire health knowledge, clarify values to make healthful choices, and practice skills to build healthful habits."
                            }
                        ]
                    },
                    {
                        "heading": "What Do You Think?",
                        "items": [
                            {
                                "prompt": "4. Where do you think you are on the Illness-Wellness continuum? List five behaviors that you currently practice that influence your level of wellness.",
                                "answer": "Personal reflection identifying your position on the scale and listing 5 habits (e.g. regular sleep, exercising, wearing seatbelts, eating fruit, avoiding smoking)."
                            }
                        ]
                    }
                ]
            }
        ],
        # Page 14
        [
            {
                "type": "heading",
                "text": "3. Taking Control of Your Health"
            },
            {
                "type": "p",
                "text": "Now is the time for you to start taking control of your own health. In the last few years, as you have become more physically and emotionally independent, you have begun to make many choices for yourself. Who chooses the clothes you wear? Who chooses what you eat for lunch? Who decides what you do with your friends? Your parents probably still help you make some choices, but you are making more and more decisions on your own. By the time you finish high school, you will be making almost all of your daily choices by yourself."
            },
            {
                "type": "heading",
                "text": "Accepting Responsibility"
            },
            {
                "type": "p",
                "text": "Now that you have so much control over your own life, you also need to accept responsibility for the consequences of your choices. Nowhere is this more true than with your health. The daily choices you make will determine your level of wellness now and in the future."
            },
            {
                "type": "p",
                "text": "Look at Figure 1-11. What are the three most common causes of death among teenagers today? What are the risk behaviors that lead to these deaths? Would you be surprised to learn that there is a risk behavior common to all three? That risk behavior is substance abuse, the use of alcohol and other drugs. Heavy drinking or drug use can lead directly to death by overdose. It can also lead to fatal accidents because alcohol and other drugs impair reaction time and clear thinking. Impaired judgment can also lead to violent behavior, which accounts for many homicides and suicides."
            },
            {
                "type": "p",
                "text": "The three most common causes of teenage death are not illness — they are accidents, homicide, and suicide. These three causes account for almost three-fourths of all deaths among teenagers. All of these causes of death are largely preventable. They are the result of risk behaviors that teenagers choose to practice."
            }
        ],
        # Page 15
        [
            {
                "type": "p",
                "text": "The impaired judgment of people under the influence of drugs or alcohol can lead to violent behavior."
            },
            {
                "type": "p",
                "text": "Some other risk behaviors also contribute to the rate of death among teenagers. These include: taking chances for the fun of it; being unwilling or unable to talk about problems or to ask for help; and accepting a known risk just to be one of the crowd. You will learn more about each of these risk behaviors throughout this book."
            },
            {
                "type": "p",
                "text": "Some of these risk behaviors contribute to another set of health threats to teenagers: unwanted pregnancy and sexually transmitted diseases. All of these problems have a major impact on physical, mental, and social health. They affect not only the quality of your life but that of others."
            },
            {
                "type": "p",
                "text": "Making responsible decisions about relationships of all kinds, including sexual relationships, is another way to protect your state of wellness."
            },
            {
                "type": "heading",
                "text": "Looking Ahead"
            },
            {
                "type": "p",
                "text": "Considering the long-term effects of your behavior is another sign of maturity. The habits you build now will carry over into your adult life. If you learn to eat a well-balanced diet, get regular exercise, manage stress, and avoid tobacco, alcohol, and drugs, you will build a foundation for a lifetime of wellness."
            },
            {
                "type": "p",
                "text": "The most common killers of adults today are health conditions that can be strongly influenced by life-style choices: heart disease, cancer, and stroke. By choosing healthful behaviors now, you can reduce your risk of developing these diseases later in life. Remember that your health is in your hands!"
            },
            {
                "type": "review",
                "title": "Section 3 Review",
                "sections": [
                    {
                        "heading": "What Have You Learned?",
                        "items": [
                            {
                                "prompt": "1. What are the three most common causes of teenage death?",
                                "answer": "Accidents, homicide, and suicide."
                            },
                            {
                                "prompt": "2. What kind of accidents kill the most teenagers?",
                                "answer": "Motor vehicle accidents."
                            },
                            {
                                "prompt": "3. What risk behavior is often associated with the three leading causes of teenage death?",
                                "answer": "Substance abuse (use of alcohol and other drugs)."
                            }
                        ]
                    },
                    {
                        "heading": "What Do You Think?",
                        "items": [
                            {
                                "prompt": "4. What life-style changes could you make now to improve your future quality of life?",
                                "answer": "Adopt a balanced diet, engage in regular physical exercise, avoid tobacco and alcohol, practice stress management, and always wear seat belts."
                            }
                        ]
                    }
                ]
            }
        ],
        # Page 16
        [
            {
                "type": "heading",
                "text": "Health Skills — Making a Decision"
            },
            {
                "type": "activity",
                "text": "Suppose you had to make this decision: You've just found the perfect after-school job. It's near home, it's fun to do, and it will pay for the bicycle you need for your bicycling trip next summer. Then you make the basketball team that you've tried out for three times. Unfortunately, the team practices during the same hours as your job. How should you choose between the team and the job?\n\nAlthough many of your choices are not this complicated, you sometimes face even harder decisions. They require much thought and soul-searching because they can make important differences in your life. Do you sometimes 'hide from' tough choices because they make you feel anxious? Do you ever rush headlong into decisions without really thinking them through? There is a process, called DECIDE, that makes decision-making easier. This process is simple to remember because each letter in the word DECIDE stands for a step in the process.\n\n1. Define the Problem: Look carefully at the decision you are facing, and state the issue clearly. Is it important and complex enough to warrant using DECIDE? Some choices are too easy; you already know what to do. Others don't really make much difference; a flip of a coin would do.\n\n2. Explore the Alternatives: Make a list of all possible alternatives for solving your problem. Be sure to include 'doing nothing' if it is appropriate. If you need more information to fully understand some alternatives, do the research now. You may find some choices unrealistic; do not include them.\n\n3. Consider the Consequences: One by one, think through what might happen with each alternative. List both positive and negative results. Consider what probably would happen, not what you hope would happen. Ask yourself: How risky is each alternative? What are its chances of success? How would it affect my future? Remember to consider the effects on other people."
            }
        ],
        # Page 17
        [
            {
                "type": "activity",
                "text": "4. Identify Your Values: Your values, the things you believe in strongly, affect how you live your life and how you feel about yourself. Sometimes, your values influence your decisions even when you are not aware of them. At other times, you may overlook your values when you want something badly. When you do this, though, your values often affect how you feel about the decision later on. Think about your long-term goals as well as the beliefs of your family, religion, and community. Consider your own and others' health and safety, and your self-respect. Which of the choices are most in line with your values?\n\n5. Decide and Act: Use the information you have collected to compare each of the alternatives. Decide which one is best for you. Act on your decision by first breaking it down into smaller steps, and then setting a realistic deadline for accomplishing each step. Then, follow through with your plan.\n\n6. Evaluate the Results: How did your decision work out? What are its effects on your life? On others? What did you learn? What would you do differently? If you can change some aspect of the result for the better, do it now."
            },
            {
                "type": "review",
                "title": "Apply the Skill — DECIDE Process",
                "sections": [
                    {
                        "heading": "Apply the Skill",
                        "items": [
                            {
                                "prompt": "1. Imagine that you face the decision introduced at the beginning of this feature — to choose the job or the team. Follow the steps of DECIDE to determine what you would do in this situation. Write out your answers for steps 1 through 5. Be sure to consider all alternatives; there may be more than two. (For example, it may be possible to postpone a choice or to take another route to a goal.) Don't forget to include the step to act on your decision.",
                                "answer": "Define problem (job vs team), explore alternatives (ask for shifted hours, work weekends, pick team, pick job), consider consequences of each, identify values (sportsmanship, financial independence, commitment), decide and act on best option."
                            },
                            {
                                "prompt": "2. List other difficult, important decisions for which DECIDE might be useful. Do they fall into categories? What categories of decisions would not be suitable for DECIDE?",
                                "answer": "DECIDE is useful for career choices, peer pressure dilemmas, high-school course selection, or health habits. Trivial choices (what to wear, what movie to watch) or emergency split-second safety choices (swerving a bike) are not suitable."
                            },
                            {
                                "prompt": "3. Set up a possible situation like the one in the beginning of this feature — in other words, imagine a person facing a complicated, important decision. Include enough information about the problem to show that it is a tough choice. Then use DECIDE to work through the decision-making process. Remember, at some times there is more than one 'right' choice. Your particular values, skills, background, and preferences all help determine what is right for you.",
                                "answer": "Example: Choosing between attending a friend's party where alcohol will be served or staying home to study for a crucial final exam."
                            },
                            {
                                "prompt": "4. Consider a tough decision you have made in the past or one you are facing now. Use DECIDE to determine what you should do (or should have done). Write out steps 1 through 5. Did DECIDE help you focus on important values or choices you might otherwise have overlooked? Which ones? Did DECIDE make the decision-making process easier? Why or why not?",
                                "answer": "Reflect on a personal decision, applying steps 1 through 5 to see how values and consequences clarify the best path."
                            }
                        ]
                    }
                ]
            }
        ],
        # Page 18
        [
            {
                "type": "heading",
                "text": "Chapter 1 Review"
            },
            {
                "type": "summary",
                "text": "Health is more than the absence of disease; it is the well-being of your body, mind, and relationships with other people."
            },
            {
                "type": "summary",
                "text": "The holistic concept of wellness emphasizes the connection between physical health, mental health, and social health."
            },
            {
                "type": "summary",
                "text": "Your behavior, or life style, has the strongest influence on your level of wellness. Other factors that influence your level of wellness include heredity, physical and social environment, and culture."
            },
            {
                "type": "summary",
                "text": "Your level of wellness can be illustrated on a continuum known as the Illness-Wellness continuum. As you move in one direction, you move toward illness or early death. As you move in the other direction, you move toward overall wellness. At the midpoint, you are neither ill nor well."
            },
            {
                "type": "summary",
                "text": "Risk behaviors increase the chances of illness or death. It is important to analyze the risks of an activity before doing it."
            },
            {
                "type": "summary",
                "text": "You can change your level of wellness by increasing your self-awareness, acquiring knowledge, making healthful behavior choices, and practicing and using skills."
            },
            {
                "type": "summary",
                "text": "The major health hazards for teenagers include accidents, homicide, suicide, unwanted pregnancy, sexually transmitted diseases, and drug and alcohol abuse."
            },
            {
                "type": "summary",
                "text": "The life-style decisions you make and carry out now affect both your current level of wellness and your future quality of life."
            },
            {
                "type": "review",
                "title": "Chapter 1 Exercises (Part 1)",
                "sections": [
                    {
                        "heading": "Vocabulary Review",
                        "items": [
                            {
                                "prompt": "1. the way or style in which you choose to live your life",
                                "answer": "life style"
                            },
                            {
                                "prompt": "2. all your surroundings and the influence they have on you",
                                "answer": "environment"
                            },
                            {
                                "prompt": "3. the well-being of your body, mind, and relationships with other people",
                                "answer": "wellness (or health)"
                            },
                            {
                                "prompt": "4. a sliding scale that illustrates your overall level of wellness",
                                "answer": "Illness-Wellness continuum"
                            },
                            {
                                "prompt": "5. whole",
                                "answer": "holistic"
                            },
                            {
                                "prompt": "6. an action that increases the chance of a harmful outcome",
                                "answer": "risk behavior"
                            },
                            {
                                "prompt": "7. all the traits passed on biologically from parent to child",
                                "answer": "heredity"
                            },
                            {
                                "prompt": "8. a pattern of behavior that has become automatic and hard to change",
                                "answer": "habit"
                            },
                            {
                                "prompt": "9. all the ideas, customs, and ways of living that characterize a group of people",
                                "answer": "culture"
                            },
                            {
                                "prompt": "10. the highest level of wellness",
                                "answer": "optimum health"
                            }
                        ]
                    },
                    {
                        "heading": "What Have You Learned? (Questions 1–4)",
                        "items": [
                            {
                                "prompt": "1. Briefly describe three characteristics of mental health.",
                                "answer": "Liking yourself for your achievements, learning from mistakes, and coping with the demands of life while adjusting to new situations."
                            },
                            {
                                "prompt": "2. Give an example of how the three aspects of health are interrelated.",
                                "answer": "When coming down with flu (physical), you may get easily irritable with family (social) or feel stressed about missed schoolwork (mental)."
                            },
                            {
                                "prompt": "3. How much has the average life expectancy of Americans increased since 1900?",
                                "answer": "By about 27 years (from ~47 years in 1900 to over 74 years)."
                            },
                            {
                                "prompt": "4. How can heredity affect your overall level of health?",
                                "answer": "By passing down biological traits and potential risk factors (such as a tendency toward high blood pressure or diabetes)."
                            }
                        ]
                    }
                ]
            }
        ],
        # Page 19
        [
            {
                "type": "review",
                "title": "Chapter 1 Exercises (Part 2)",
                "sections": [
                    {
                        "heading": "What Have You Learned? (Questions 5–12)",
                        "items": [
                            {
                                "prompt": "5. List three possible health hazards in the physical environment. Explain how you can protect yourself from them.",
                                "answer": "Air/water pollution, UV radiation, and loud noise. Protect yourself by avoiding polluted water, wearing sunscreen, and keeping radio volume safe."
                            },
                            {
                                "prompt": "6. Define peer pressure and explain how it can affect your health.",
                                "answer": "Pressure from friends or acquaintances of your own age. Unhealthful peers can pressure you into risky behaviors; healthful peers encourage wellness."
                            },
                            {
                                "prompt": "7. Use a continuum to illustrate a health-related change in your life.",
                                "answer": "For example, starting an exercise program moves you progressively from lower energy toward higher fitness on the continuum."
                            },
                            {
                                "prompt": "8. List three risk behaviors that can be fatal.",
                                "answer": "Substance abuse (drugs/alcohol), reckless driving without a seat belt, and motorcycle riding without a helmet."
                            },
                            {
                                "prompt": "9. Briefly describe a situation in which a risk is worth taking and explain why.",
                                "answer": "Skiing or competitive sports — the enjoyment and health benefits outweigh the small risk when proper equipment and safety rules are used."
                            },
                            {
                                "prompt": "10. What are two ways to become aware of your own level of wellness?",
                                "answer": "Listening to physical symptoms/feelings and getting regular medical check-ups with your doctor."
                            },
                            {
                                "prompt": "11. What are two good sources of knowledge about health?",
                                "answer": "Health textbooks, doctors, and scholarly medical journal studies."
                            },
                            {
                                "prompt": "12. Explain how values can affect a health-related decision.",
                                "answer": "Your core beliefs (safety, family, self-respect) guide your choices when weighing alternatives and long-term consequences."
                            }
                        ]
                    },
                    {
                        "heading": "What Do You Think?",
                        "items": [
                            {
                                "prompt": "1. Describe a problem you recently had to face. Then explain how your physical, mental, and social well-being played a part in reacting to the problem and in resolving it.",
                                "answer": "Reflect on a personal challenge and how energy level (physical), positive attitude (mental), and support from friends (social) helped resolve it."
                            },
                            {
                                "prompt": "2. In spite of all the knowledge available about the health risks of smoking, many teenagers still smoke. Why do you think this is so? What argument against smoking do you think would be the most effective for teens?",
                                "answer": "Teens smoke due to peer pressure, wanting to look mature, or misleading ads. Effective arguments focus on short-term loss of athletic fitness, smell, cost, and addiction."
                            },
                            {
                                "prompt": "3. Compare a TV, magazine, or newspaper ad promoting a healthful behavior with one for an unhealthful activity. How do the ads try to influence your behavior?",
                                "answer": "Ads use attractive role models, fun settings, and emotional appeals to make products seem appealing regardless of actual health impact."
                            },
                            {
                                "prompt": "4. Some people say that teenagers do not take the dangers of risk behaviors seriously. They behave as though they think that harm only comes to other people. Do you think this is true or not? Give three examples to support your opinion.",
                                "answer": "Often true due to feelings of invincibility. Examples: speeding in cars, not wearing helmets, experimenting with drugs/alcohol."
                            },
                            {
                                "prompt": "5. Give some thought to the term quality of life. What five elements do you think are most important to your quality of life? Why?",
                                "answer": "Examples: good health, strong friendships, loving family, freedom to pursue goals, and emotional peace."
                            }
                        ]
                    },
                    {
                        "heading": "What Would You Do?",
                        "items": [
                            {
                                "prompt": "1. You have a friend who lives on junk food and smokes cigarettes. He says he knows these behaviors are not harming him because he feels fine. What would you tell him?",
                                "answer": "Explain that dietary and smoking risks build long-term damage (heart disease, cancer) over time even if symptoms aren't immediate."
                            },
                            {
                                "prompt": "2. You are not getting along with your friends or family. Often, you want to be alone. Should you seek help? From whom? Explain.",
                                "answer": "Yes, seeking help from a counselor, trusted teacher, or parent can help identify underlying causes and restore healthy social well-being."
                            },
                            {
                                "prompt": "3. All your friends are drinking a diet supplement instead of eating regular meals. When you ask about the diet, they give you the brochure that came with the supplement. How would you make a well-informed decision about this diet?",
                                "answer": "Consult a doctor, research independent medical studies, and check if it provides essential balanced nutrients."
                            },
                            {
                                "prompt": "4. You are happy with your current state of wellness, but you want to be healthy in the future, too. What actions can you take now to promote your future well-being?",
                                "answer": "Maintain a balanced diet, exercise regularly, build strong social relationships, and avoid tobacco, alcohol, and drugs."
                            },
                            {
                                "prompt": "5. You have diabetes, a condition that limits the amount of sugar your body can process. You need to restrict your diet and check your blood-sugar levels. How can you achieve optimum wellness?",
                                "answer": "By actively managing diet, monitoring sugar levels, staying physically active, and maintaining a positive attitude despite physical limitations."
                            }
                        ]
                    },
                    {
                        "heading": "For Further Study",
                        "items": [
                            {
                                "prompt": "1. Find out what is meant by the term preventive medicine. How does preventive medicine lead to optimum health?",
                                "answer": "Preventive medicine focuses on preventing disease before it starts through immunizations, check-ups, screening, and lifestyle education."
                            },
                            {
                                "prompt": "2. Research the disease tuberculosis. Find out the cause of the disease and what environmental and social conditions led to its being a \"killer disease\" in 1900. Then, explain why tuberculosis of the lungs is no longer a major threat in this country.",
                                "answer": "Caused by bacteria (Mycobacterium tuberculosis), spread in overcrowded, poorly ventilated places. Antibiotics, improved sanitation, and screening reduced its threat."
                            },
                            {
                                "prompt": "3. Look in the library for reliable sources of information about health. Select three sources and explain why they are reliable.",
                                "answer": "Peer-reviewed medical journals, publications from government health agencies (CDC, WHO), and medical textbooks."
                            }
                        ]
                    }
                ]
            }
        ]
    ]
}

print("Constructed ch1_data successfully!")
print("Pages count:", len(ch1_data['pages']))
