// Full chapter prose for the Science market pack's "Read" mode, hand-cleaned
// from OCR'd scans of the source textbook (src/assets/data/science.pdf) -
// diagram-caption fragments and lab-activity instructions are kept as their
// own block types instead of being blended into the narrative paragraphs.
// Keyed by the exact same `topic` string used on each word in marketData.js
// (e.g. "Ch.01 · Green Plants"), so lookup from a selected chapter is direct.
//
// Block shape: { type: 'heading' | 'p' | 'activity' | 'sidebar' | 'summary', text }
//   | { type: 'image-group', images: [{ src, caption }, ...] }
//   - 'activity'/'sidebar' text is the block's own body; for 'summary' it's
//     one bullet's text (grouped into a single block by the page builder).
//   - 'image-group' images are cropped from the source scan (public/images/science/ch01/),
//     matching what actually appears on the corresponding page of the book.
// Pages are pre-chunked (roughly 120-160 words each) so the reader never has
// to re-flow text on the fly.

export const scienceChapterText = {
  "Ch.01 · Green Plants": {
    title: "Activities of Green Plants",
    pages: [
      [
        { type: 'heading', text: 'Chapter 1 · Activities of Green Plants' },
        { type: 'p', text: "In the spring the weather becomes warm, and green plants begin to grow from the soil. In a few weeks many plants produce beautifully colored flowers. The picture shows the stages in the opening of a daffodil flower. Flowers do more than add beauty to the world — they are an important part of the plant. Without flowers, many plants could not produce more of their kind." },
        { type: 'p', text: "Producing new plants is one special activity that green plants {{carry out}}. What are some other special activities of green plants? How do the parts of green plants help them {{carry out}} these activities? You will {{find out}} in this chapter." }
      ],
      [
        { type: 'image-group', images: [
          { src: '/images/science/ch01/daffodil-shoots.jpg', caption: 'Daffodil shoots coming up in spring' }
        ] }
      ],
      [
        { type: 'heading', text: 'Living Things Are Alike' },
        { type: 'p', text: "In what ways are living things alike? All living things are alike in many ways. One way is that they are {{made up of}} cells. A cell is the basic unit of all living things. Cells are sometimes called the \"building blocks of life.\" The cells that {{make up}} plants and animals can be compared to the bricks in a building — many bricks are needed to {{make up}} a building, just as many cells are needed to {{make up}} most plants and animals." },
        { type: 'p', text: "Most living things contain many different kinds of cells. The cells in your brain are different from the cells in your heart. The cells in the roots of a plant are different from the cells in its leaves. But no matter what kind of cells they are, all cells are very small — they can only be seen through a microscope." },
        { type: 'image-group', images: [
          { src: '/images/science/ch01/onion-skin-cells.jpg', caption: 'Onion skin cells' },
          { src: '/images/science/ch01/brick-wall.jpg', caption: 'Cells are like bricks in a building' }
        ] }
      ],
      [
        { type: 'p', text: "Living things are alike in another way too: all living things need certain things to stay alive. You are a living thing — what do you need to stay alive? Three things you need are food, water, and air. Plants and animals also need these things." },
        { type: 'p', text: "To meet their needs, living things must {{carry out}} life processes. Life processes are the activities that keep living things alive. This is another way in which all living things are alike." },
        { type: 'activity', text: "Life processes of living things: Getting food — most living things get food from plants and animals, but green plants make their own food. Releasing energy — living things {{break down}} food to release the energy stored in it. Removing wastes — living things {{get rid of}} waste materials. Growing — living things grow in size, and also replace old, worn cells by growing new ones. Reproducing — living things produce more living things of the same kind." },
        { type: 'image-group', images: [
          { src: '/images/science/ch01/elk.jpg', caption: 'Elk' },
          { src: '/images/science/ch01/giraffe.jpg', caption: 'Giraffe' }
        ] }
      ],
      [
        { type: 'heading', text: 'Transporting Materials' },
        { type: 'p', text: "How do green plants transport the materials needed to make food? You have learned some ways in which living things are alike. One way in which living things differ is in how they {{carry out}} some of the life processes. Most living things get food by eating plants and animals — but green plants do not eat food, they make it." },
        { type: 'p', text: "Green plants need three things to make food: (1) water, (2) carbon dioxide, and (3) light energy. Food making usually takes place in the leaf cells of green plants, so the things needed to make food must be transported to these leaf cells by the roots, stems, and leaves." },
        { type: 'p', text: "Roots play an important role in transporting materials for food making. Small hairlike parts grow out from the sides of a root." },
        { type: 'image-group', images: [
          { src: '/images/science/ch01/root-hairs-radish.jpg', caption: 'Root hairs on radish seedlings' }
        ] }
      ],
      [
        { type: 'p', text: "These are called root hairs. A root hair is part of a single cell that grows from a root into the soil. Root hairs grow near the tips of roots. Almost all the water {{taken in}} by roots is {{taken in}} by the root hairs. The rest of the root helps to anchor the plant in the soil and to store food." },
        { type: 'p', text: "The small root hairs enter spaces between bits of soil. The water in these spaces is {{taken in}}, or absorbed, by the root hairs. There are millions of root hairs on most plant roots. The more root hairs there are, the more water the root can absorb." },
        { type: 'image-group', images: [
          { src: '/images/science/ch01/root-hair-tip.jpg', caption: 'Root tip' },
          { src: '/images/science/ch01/root-hairs-microscope.jpg', caption: 'Root hairs under a microscope' }
        ] }
      ],
      [
        { type: 'activity', text: "Hands-on: What do root hairs look like? Materials: paper towel / self-sealing plastic bag / 4 radish or bean seeds / stapler / 2 pushpins / jar / hand lens / scissors / tweezers / microscope slide / microscope. Procedure: A. Fold a paper towel in half and put it in a plastic bag. Place the bag on a table. B. Place four seeds on the paper towel inside the bag. Staple the bag and towel beneath each seed as shown. Then staple the sides of the bag. C. Use two pushpins to put the bag on a bulletin board. Open the bag and carefully pour some water behind the towel. The water level should not go above the staples beneath the seeds. Seal the bag. D. Check the seeds each day. When the roots are about 3 cm long, take the bag down. Carefully remove the seeds from the bag. Examine the fuzzy areas on the roots with a hand lens. 1. Describe what you see. 2. Draw a root and show where the root hairs are. Label the drawing. E. Use scissors to cut off one root from a seed. Carefully pick up the root with tweezers and place it on a microscope slide. Examine the fuzzy areas of the root under a microscope. 3. Make a drawing of the root hairs as they look under a microscope. Conclusion: 1. Describe what the root hairs look like. 2. Why is it helpful for a plant to have many root hairs? Using science ideas: Many plants that live in water do not have root hairs. Why don't these plants need root hairs?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch01/activity-seeds-bag.jpg', caption: 'Seeds in a damp paper towel' },
          { src: '/images/science/ch01/activity-bag-board.jpg', caption: 'Hang the bag to keep it moist' },
          { src: '/images/science/ch01/activity-boy-microscope.jpg', caption: 'Examine the roots under a microscope' }
        ] },
        { type: 'sidebar', text: "Do you know? As they absorb water from the soil, plants also {{take in}} minerals, which they need to perform life processes. Most land plants get minerals from the soil — but a few green plants get minerals by eating insects! The Venus's-flytrap, for example, traps insects with its leaves: as an insect crawls onto a leaf, the leaf presses shut and {{gives off}} special juices that {{break down}} the insect's body, releasing minerals the plant can use." },
        { type: 'image-group', images: [
          { src: '/images/science/ch01/venus-flytrap.jpg', caption: "Venus's-flytrap" }
        ] }
      ],
      [
        { type: 'p', text: "From the roots, water is transported to the stem. The stem is the part of the plant between the roots and the leaves. The stem transports water and food to all parts of the plant through tubes. There are two kinds of tubes within the stem, occurring in bundles: one kind transports water upward from the roots to the leaves, and the other transports food from the leaves downward to all parts of the plant." },
        { type: 'p', text: "Water is transported from the stem to the leaves. Most leaves contain small thin tubes called veins, much like the tubes in the stem — they carry water and food to and from leaf cells." },
        { type: 'image-group', images: [
          { src: '/images/science/ch01/stem-cross-section.svg', caption: 'Water-carrying and food-carrying tubes inside a stem' }
        ] }
      ],
      [
        { type: 'p', text: "Besides water, leaf cells need carbon dioxide to make food. Carbon dioxide is one of the gases in air. How does air get into a leaf? The underside of a leaf, seen through a microscope, has small openings called stomata. Air enters a leaf through these stomata." },
        { type: 'p', text: "Light energy is the third thing needed for leaf cells to make food. Most leaves are flat and thin, which allows light to reach the food-making cells inside the leaf." },
        { type: 'p', text: "To sum up how a plant gets materials for food making: water enters the roots and moves through the stem to the leaf; air, containing carbon dioxide, enters the leaf through the stomata; and sunlight striking the leaf provides the energy that leaf cells need to make food." },
        { type: 'image-group', images: [
          { src: '/images/science/ch01/leaf-veins-stomata.jpg', caption: 'Veins and stomata in a leaf' },
          { src: '/images/science/ch01/plant-materials-diagram.svg', caption: 'How a plant gets materials for food making' }
        ] }
      ],
      [
        { type: 'heading', text: 'Food Making in a Leaf' },
        { type: 'p', text: "How do green plants make food? Imagine a factory in which bread is made. Flour, milk, and other materials must first be transported to the factory, then mixed together to form dough. The dough is then baked in ovens using heat energy. The product made by this process is bread." },
        { type: 'p', text: "The leaf of a green plant is much like a factory. Water and carbon dioxide are materials that must be transported to the leaf factory. Sunlight provides the energy to make the product. Food, in the form of sugar, is the product that is made. The process by which green plants make food is called photosynthesis." },
        { type: 'image-group', images: [
          { src: '/images/science/ch01/bakery.jpg', caption: 'A bakery is like a leaf — materials in, food out' },
          { src: '/images/science/ch01/chloroplasts-elodea.jpg', caption: 'Chloroplasts in elodea leaf cells' }
        ] }
      ],
      [
        { type: 'p', text: "To better understand photosynthesis, it helps to know what the inside of a leaf is like. Leaf cells contain chloroplasts — small green bodies inside plant cells. The green color comes from a special material needed by the plant to make food, called chlorophyll." },
        { type: 'p', text: "The cells inside a leaf, seen under a microscope, show a waxy covering on the top and bottom. Beneath this covering is a single layer of cells that help protect the leaf from damage — these usually don't contain chloroplasts. The stomata sit in the bottom layer of these cells, and gases enter and leave the plant through these openings." },
        { type: 'image-group', images: [
          { src: '/images/science/ch01/leaf-cross-section.svg', caption: 'Leaf cross section' }
        ] }
      ],
      [
        { type: 'p', text: "The food-making cells are in the middle part of the leaf. There are a great many chloroplasts in these cells. Around the food-making cells are air spaces, connected to the stomata, which allow carbon dioxide to reach the food-making cells. The vein contains cells that carry water to the food-making cells." },
        { type: 'p', text: "Now, how is food actually made in these cells? Sunlight strikes the leaf and passes through to the chlorophyll in the food-making cells, where it is trapped. Water is carried to the food-making cells by the vein." }
      ],
      [
        { type: 'p', text: "The sun's energy is used to change water into two gases: hydrogen and oxygen. The oxygen gas, a waste product, moves out of the leaf through the stomata. Meanwhile, carbon dioxide gas enters the leaf through the stomata and moves to the food-making cells. The hydrogen gas joins with the carbon dioxide gas to make food — a type of sugar. The sugar is then carried by the vein to the rest of the plant." },
        { type: 'p', text: "A simple way to show what happens during photosynthesis is: water + carbon dioxide + energy (from sunlight) → sugar + oxygen." },
        { type: 'image-group', images: [
          { src: '/images/science/ch01/photosynthesis-diagram.svg', caption: 'Food making in a leaf' }
        ] }
      ],
      [
        { type: 'p', text: "Most plants make more sugar than they need. This sugar is stored in the cells of the plant — think about the fruits and vegetables you eat that taste sweet. These sweet-tasting plants contain much stored sugar." },
        { type: 'p', text: "Some of the extra sugar made by the plant is changed to starch, which is also stored in the cells of the plant. A white potato, for example, is an underground stem that contains large amounts of stored starch." },
        { type: 'heading', text: 'Sugar Transport — Using the Energy in Food' },
        { type: 'p', text: "How do plants use the energy stored in food? Living things need energy to {{carry out}} life processes. They get energy from food, but the energy in food is stored energy — it must be released before it can be used." },
        { type: 'image-group', images: [
          { src: '/images/science/ch01/white-potatoes.jpg', caption: 'White potatoes store starch' },
          { src: '/images/science/ch01/sweet-fruits-vegetables.jpg', caption: 'Sweet-tasting fruits and vegetables' }
        ] }
      ],
      [
        { type: 'p', text: "Respiration is the process by which living things use oxygen to release energy in food. This process takes place in the cells of all living things. Before cells can {{carry out}} respiration they must first have food." },
        { type: 'p', text: "How do plants get the food needed for respiration, and how do cells change sugar to energy? Sugar is made in the leaf, then carried by the veins in the leaf to the stem. Food-carrying tubes in the stem transport sugar to all parts of the stem and down to the roots." }
      ],
      [
        { type: 'p', text: "In an enlarged plant cell, oxygen enters and combines with sugar. When oxygen and sugar combine, energy is released, which the cell uses to {{carry out}} life processes. Carbon dioxide and water are {{given off}} as waste products." },
        { type: 'p', text: "A simple way to show what happens during respiration is: sugar + oxygen → energy + carbon dioxide + water." },
        { type: 'p', text: "The process of respiration is the opposite of photosynthesis. Photosynthesis takes place only in cells with chlorophyll, makes food (sugar), stores the sun's energy in sugar, {{takes in}} carbon dioxide and water, and {{gives off}} oxygen. Respiration takes place in all cells, breaks food (sugar) down, releases the energy stored in sugar, and produces and {{gives off}} carbon dioxide and water while using oxygen." },
        { type: 'image-group', images: [
          { src: '/images/science/ch01/respiration-diagram.svg', caption: 'Respiration in an enlarged root cell' }
        ] }
      ],
      [
        { type: 'heading', text: 'Producing New Plants' },
        { type: 'p', text: "How do flowers produce seeds? Some of the energy released by plants during respiration is used for reproduction — the process by which living things produce new living things of the same kind. Many green plants grow flowers. A flower is the reproductive part of a flowering plant." },
        { type: 'p', text: "Many flowers have three main parts: the petals, the stamen, and the pistil. Each part plays a role in reproduction." },
        { type: 'image-group', images: [
          { src: '/images/science/ch01/flower-parts-diagram.svg', caption: 'Parts of a typical flower' },
          { src: '/images/science/ch01/lily.jpg', caption: 'Lily' }
        ] }
      ],
      [
        { type: 'p', text: "The petals are the leaflike outer parts of a flower. They protect the inner reproductive parts, and are often brightly colored — some also have a sweet odor." },
        { type: 'p', text: "The other two parts of the flower are involved directly in reproduction. The stamen is the male reproductive part of a flower — a long stalk with a sac at the top. Stamens produce pollen grains. A pollen grain is a tiny body that contains the male reproductive cell. Millions of pollen grains form in the sac at the top of the stamen." },
        { type: 'image-group', images: [
          { src: '/images/science/ch01/sunflower-pollen.jpg', caption: 'Sunflower pollen' },
          { src: '/images/science/ch01/daylily-pollen.jpg', caption: 'Daylily pollen' },
          { src: '/images/science/ch01/pollen-field.jpg', caption: 'Pollen grains under a microscope' }
        ] }
      ],
      [
        { type: 'p', text: "The pistil is the female reproductive part. The bottom part of the pistil contains the ovary. The ovary is the part of the plant that contains ovules. An ovule is a small round body that contains the female reproductive cells." },
        { type: 'activity', text: "Hands-on: What are the parts of a typical flower? Materials: 2 different kinds of flowers / hand lens / microscope slide / microscope / straight pin / sheet of paper. Procedure: A. Look at and compare two flowers. Identify the petals of each flower. Smell them. 1. What color are the petals of each flower? 2. Do the petals of either flower have an odor? B. Identify the stamens and the pistil of each flower. Use a hand lens to help you see the parts. C. Choose one flower and look at its inner parts. Carefully tear off any leafy parts around the petals. Then tear off the petals. D. Gently remove one stamen and look at the top part with a hand lens. The powdery material is made up of many pollen grains. Shake some of the pollen grains onto a microscope slide. Look at the slide under a microscope. 3. Draw some pollen grains. E. Remove the rest of the stamens. Place the pistil on a sheet of paper. Use a straight pin to pick apart the base of the pistil. The ovules are inside this base. Use a hand lens to look at the ovules. 4. Draw what you see. Conclusion: 1. What parts do the two flowers have in common? 2. What are some differences between the flowers? Using science ideas: Suppose you wanted to know how many seeds the flower you looked at could produce. How could you find out?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch01/activity-boy-flower-lens.svg', caption: 'Examining a flower with a hand lens' },
          { src: '/images/science/ch01/activity-stamen-closeup.svg', caption: 'Removing a stamen to look at its pollen' },
          { src: '/images/science/ch01/activity-ovary-diagram.svg', caption: 'Ovary and ovules, pulled open with a pin' }
        ] }
      ],
      [
        { type: 'p', text: "For reproduction to take place, pollen grains must reach the top of the pistil. Pollination is the process by which pollen grains move from the stamen to the pistil. There are two main ways in which flowers are pollinated: by insects, or by the wind." },
        { type: 'p', text: "Most flowers are pollinated by insects. Some insects, such as the honeybee, are attracted to flowers that have a sweet odor and colorful petals. As the honeybee feeds on the flower's sweet liquid, it brushes against pollen grains on the stamen — the pollen sticks to the bee, and as it moves on, the bee carries the pollen to the pistil of the next flower." },
        { type: 'image-group', images: [
          { src: '/images/science/ch01/honeybee.jpg', caption: 'A honeybee pollinating a flower' }
        ] }
      ],
      [
        { type: 'p', text: "Other flowers are pollinated when the wind blows, carrying pollen grains from the stamen to the pistil. Plants that don't have a sweet odor and colorful petals — grasses and trees, for example — are often pollinated this way." },
        { type: 'p', text: "When a pollen grain lands on the top of the pistil, it sticks, because the top of the pistil is sticky. The pollen grain then begins to grow a tube, which grows down through the pistil until it reaches an ovule. When it reaches an ovule, the male cell from the pollen grain combines with a female cell. The joining of male and female reproductive cells is called fertilization." },
        { type: 'image-group', images: [
          { src: '/images/science/ch01/black-birch-tree.jpg', caption: 'Black birch tree, wind-pollinated' },
          { src: '/images/science/ch01/grass-wheat.jpg', caption: 'Grass (wheat), wind-pollinated' },
          { src: '/images/science/ch01/fertilization-diagram.svg', caption: 'A pollen tube growing to an ovule' }
        ] }
      ],
      [
        { type: 'p', text: "The fertilized ovule becomes a seed containing a tiny young plant and stored food. The tiny young plant is called an embryo. When conditions are right, the embryo begins to grow — this growth of a plant embryo from a seed is called germination. As the embryo grows, it uses the food stored in the seed. Once it reaches a certain size, the young plant will make its own food by photosynthesis." },
        { type: 'image-group', images: [
          { src: '/images/science/ch01/bean-seed-cross-section.svg', caption: 'Bean seed cross section' },
          { src: '/images/science/ch01/germinating-squash-seeds.jpg', caption: 'Germinating squash seeds' }
        ] }
      ],
      [
        { type: 'summary', text: "The activities of living things that keep them alive are called life processes." },
        { type: 'summary', text: "The cell is the basic unit of living things." },
        { type: 'summary', text: "Photosynthesis is the process by which cells containing chlorophyll use water, carbon dioxide, and light energy to make food." },
        { type: 'summary', text: "Roots, stems, and leaves help supply food-making leaf cells with the materials needed for photosynthesis." },
        { type: 'summary', text: "Respiration is the process by which living things use oxygen to release the energy in food." },
        { type: 'summary', text: "Reproduction is the process by which living things produce new living things of the same kind." },
        { type: 'summary', text: "A flower is the reproductive part of a plant, and seeds form from the fertilized ovule inside its pistil." }
      ],
      [
        { type: 'review', title: 'Reviewing the Chapter', sections: [
          {
            heading: 'Science Words',
            instructions: 'Match each definition to the term it describes.',
            items: [
              { prompt: '1. Fertilized ovule containing a tiny young plant and food', answer: 'seed' },
              { prompt: '2. Green material needed by a plant to make food', answer: 'chlorophyll' },
              { prompt: '3. Openings in a leaf through which air enters the leaf', answer: 'stomata' },
              { prompt: '4. Part of a single cell that grows from a root into the soil', answer: 'root hair' },
              { prompt: '5. Small green body in plant cells', answer: 'chloroplast' },
              { prompt: '6. Basic unit of living things', answer: 'cell' },
              { prompt: '7. Tiny young plant in a seed', answer: 'embryo' },
              { prompt: '8. Thin tube in a leaf', answer: 'vein' }
            ]
          },
          {
            heading: 'Science Words — Fill in the Blank',
            instructions: 'Complete the paragraph using: fertilization, photosynthesis, reproduction, germination, life processes, pollination, respiration.',
            items: [
              { prompt: 'The activities that keep living things alive are called ___.', answer: 'life processes' },
              { prompt: 'Green plants make food by a process called ___.', answer: 'photosynthesis' },
              { prompt: 'Plants use oxygen to release energy in food through the process of ___.', answer: 'respiration' },
              { prompt: 'Green plants produce new living things of the same kind by ___.', answer: 'reproduction' },
              { prompt: 'In a flower, pollen grains are moved from the stamen to the pistil during ___.', answer: 'pollination' },
              { prompt: 'The joining of male and female reproductive cells occurs during ___.', answer: 'fertilization' },
              { prompt: 'The growth of a plant embryo from a seed is called ___.', answer: 'germination' }
            ]
          },
          {
            heading: 'Understanding Ideas',
            items: [
              { prompt: 'What is the male part of a flower that produces pollen called, and what is the female part called?', answer: 'The stamen is the male part and produces pollen grains. The pistil is the female part — its base, the ovary, contains the ovules.' },
              { prompt: 'Which of these are NOT needed for photosynthesis to occur — water, carbon dioxide, petal, food, stamen, chlorophyll? Describe photosynthesis using the terms that ARE needed.', answer: "Petal, food, and stamen are not needed. Photosynthesis needs water, carbon dioxide, chlorophyll, and light energy: chlorophyll in the leaf traps sunlight, which powers the combining of water and carbon dioxide into sugar (food), releasing oxygen." },
              { prompt: 'Which of these are NOT needed for respiration to occur — light energy, sugar, carbon dioxide, seed, pistil, oxygen? Describe respiration using the terms that ARE needed.', answer: "Light energy, carbon dioxide, seed, and pistil are not needed as inputs. Respiration needs sugar and oxygen: cells combine sugar with oxygen to release energy, giving off carbon dioxide and water as waste products." }
            ]
          },
          {
            heading: 'Using Ideas',
            items: [
              { prompt: 'Plant reproduction can occur without using seeds. If you cut a piece of stem from a Swedish ivy or tradescantia plant and put it in a jar of water, checking every few days for two weeks, what happens?', answer: "The cut stem grows new roots from its lower end in the water, and can eventually grow into a whole new plant — a form of reproduction that doesn't use seeds at all." }
            ]
          }
        ] }
      ]
    ]
  },
  "Ch.02 · Invertebrates": {
    title: "Invertebrates",
    pages: [
      [
        { type: 'heading', text: 'Chapter 2 · Animals Without a Backbone' },
        { type: 'p', text: "The spider on this page is a great hunter. Did you know it can jump great distances? It can jump 40 times the length of its body. Can you see its four large eyes? It can see its insect victim from very far away." },
        { type: 'p', text: "In this chapter you will learn about all kinds of animals. Some of the animals are small, like the spider. Others are much larger than the spider. Some of these animals live in and near your home. Others live in oceans or on mountaintops." },
        { type: 'p', text: "You will find out about flying animals, floating animals, and creeping animals. You will learn about how they look and where they live. This chapter will show you how they are different and how they are alike." },
        { type: 'image-group', images: [
          { src: '/images/science/ch02/jumping-spider.jpg', caption: 'A jumping spider, a great hunter' }
        ] }
      ],
      [
        { type: 'heading', text: "Classifying Living Things" },
        { type: 'p', text: "How do scientists classify animals? For a few minutes make a list of all the animals you can think of. How many animals did you think of? There are many different kinds of animals." },
        { type: 'p', text: "Did you think of a dog, a cat, and a horse? You probably did. The chances are you did not include a sponge, a clam, or an earthworm — but these are animals, too." },
        { type: 'p', text: "Think of a way to divide your list of animals into groups. For example, you could group all large animals together and all small animals together, or group all fast animals and all slow animals together. Putting animals into groups is one way to sort them out, and it makes them easier to study." },
        { type: 'image-group', images: [
          { src: '/images/science/ch02/gannet.jpg', caption: 'Gannet' },
          { src: '/images/science/ch02/garden-spider.jpg', caption: 'Garden spider' }
        ] }
      ],
      [
        { type: 'p', text: "Scientists who study animals classify, or group, them. To classify is to arrange living things into groups by features that are alike. Scientists classify animals by structure — the structure of an animal is the kind of body parts it has and the way these parts are arranged. One structure scientists look for in classifying animals is the backbone. The backbone is made up of many small bones called vertebrae, which are linked together to form the backbone." },
        { type: 'p', text: "Some animals have a backbone and some do not. Scientists have classified all animals into two large groups: one group is made up of animals with a backbone, and an animal with a backbone is called a vertebrate. The other group is made up of animals without a backbone, and an animal without a backbone is called an invertebrate. In this chapter you will learn about invertebrates." },
        { type: 'image-group', images: [
          { src: '/images/science/ch02/zebras-wildebeests.jpg', caption: 'Zebras, wildebeests, and springboks' },
          { src: '/images/science/ch02/chimpanzee.jpg', caption: 'Chimpanzee mother with baby' },
          { src: '/images/science/ch02/purple-sea-urchin.jpg', caption: 'Purple sea urchin' }
        ] }
      ],
      [
        { type: 'heading', text: "Animals With Many Cells but No Backbone" },
        { type: 'p', text: "What do you think of when you hear the word sponge? You may think of a pink or blue pad used to clean dishes — that kind of sponge is made by people. But a sponge is also an animal. A sponge is an invertebrate that has many cells. Almost all sponges live in oceans, though a few live in freshwater streams and lakes." },
        { type: 'p', text: "Sponges do not have many of the parts we usually think of as animal parts. Most animals move about, but adult sponges stay in one place — they are found attached to rocks or other objects at the bottom of the ocean. In fact, for many years scientists thought sponges were plants." },
        { type: 'p', text: "The structure of a sponge is simple. Its body is full of small holes called pores, which are connected to one another by narrow canals." },
        { type: 'image-group', images: [
          { src: '/images/science/ch02/orange-sponge.jpg', caption: 'Orange sponge, off the northeast coast of the United States' }
        ] }
      ],
      [
        { type: 'p', text: "Special cells line the canals inside the sponge. Each cell has a threadlike part that whips back and forth, and the movement of these threads sends water through the body of the sponge. The water that passes through the sponge carries food and oxygen — cells inside the sponge {{break down}} the food, and the oxygen is used to release the energy in it." },
        { type: 'p', text: "Sponges have many different shapes — some are shaped like cups, some like fans, and others like vases. The shape of a sponge depends on its skeleton, which is the structure that supports the body of an animal." },
        { type: 'p', text: "The skeleton of some sponges is made of hard material, but other sponges are made of soft material. This soft skeleton is sometimes used in the home as a cleaning or bath sponge — usually a light brown or yellowish color, unlike the pink or blue sponge made by people." },
        { type: 'activity', text: "Finding Out: How much water can a sponge hold? Materials: animal sponge / container of water / measuring cup. Soak the sponge in the water for about 5 minutes. Remove the sponge from the water. Squeeze the water into the measuring cup. Measure the volume of water that was in the sponge. Record this volume of water. How much water did the sponge hold? Why is a cleaning sponge made similar to an animal sponge?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch02/sponge-diagram.jpg', caption: 'How a sponge moves water through its body' },
          { src: '/images/science/ch02/finding-out-water.jpg', caption: 'Finding Out: how much water can a sponge hold?' }
        ] }
      ],
      [
        { type: 'heading', text: "Animals With Stinging Cells" },
        { type: 'p', text: "The hydra, jellyfish, and sea anemone are also invertebrates. Like sponges, they do not have a backbone. Hydras live in freshwater ponds and streams, while most jellyfish and sea anemones live in oceans." },
        { type: 'p', text: "These animals are more complex than sponges. Their body is shaped like a hollow sac, open at one end. The hydra uses this opening in two ways: for taking in food, and for getting rid of wastes. The opening is surrounded by one or more rings of tentacles — a tentacle is a long, armlike part." },
        { type: 'p', text: "Hydras and jellyfish use their tentacles to catch small animals for food, and sea anemones catch food the same way. The tentacles contain many stinging cells — a stinging cell is a special structure used to help capture food. How does a stinging cell help capture food?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch02/hydra.jpg', caption: 'Hydra with tentacles' }
        ] }
      ],
      [
        { type: 'p', text: "When a small animal comes close, the stinging cells explode, pushing tiny poisonous threads into the victim. These threads prevent the animal from moving, and may even kill it. The animal is then pushed into the mouth by the tentacles and swallowed." },
        { type: 'p', text: "Have you ever walked along a beach and seen a clear blob floating in the water, or washed up on the sand? This blob was a jellyfish, and if you stepped on it, it could give you a painful sting." },
        { type: 'p', text: "The Portuguese man-of-war is an animal similar to the jellyfish — it has tentacles and stinging cells, and can be dangerous to people. A swimmer can become tangled in its tentacles, and the stinging cells can cause a painful injury." },
        { type: 'image-group', images: [
          { src: '/images/science/ch02/jellyfish.jpg', caption: 'Jellyfish' },
          { src: '/images/science/ch02/portuguese-man-of-war.jpg', caption: 'Portuguese man-of-war' },
          { src: '/images/science/ch02/sea-anemone.jpg', caption: 'Sea anemone' }
        ] }
      ],
      [
        { type: 'heading', text: "Worms" },
        { type: 'p', text: "What are the three main groups of worms? Scientists classify worms into three main groups: flatworms, roundworms, and segmented worms. The structure of worms is more complex than that of sponges or the animals with stinging cells." },
        { type: 'p', text: "The first group of worms is the flatworms — the simplest type of worm. Some live in streams and ponds. A common flatworm found in fresh water is the planarian. There are nerve cells in the head of the planarian that act like a simple brain, and above this \"brain\" are two sense organs called eyespots, which can sense light." }
      ],
      [
        { type: 'p', text: "Planarians have a very unusual ability: they can regenerate, or regrow, body parts that are missing. If their tail is cut off, planarians grow a new tail; if their head is cut off, a new head will grow. They can even regenerate part of their body — if a cut is made down the center of the head, two heads will grow." },
        { type: 'image-group', images: [
          { src: '/images/science/ch02/planarian-regeneration.jpg', caption: 'Regeneration in a planarian' }
        ] }
      ],
      [
        { type: 'p', text: "Most flatworms are parasites. A parasite is an animal or plant that depends on and harms another animal or plant. The animal or plant on which a parasite depends is called the host, and a parasite often depends on its host for food." },
        { type: 'p', text: "The tapeworm is an example of a flatworm that is a parasite. Tapeworms live in the digestive system of animals — a digestive system is a group of body parts that breaks down food. A tapeworm does not have its own digestive system: the host animal does the eating and digesting, and the tapeworm takes in already-digested food through an opening in its body. The host loses weight and becomes weak, and some tapeworms may grow as long as 9 m." },
        { type: 'image-group', images: [
          { src: '/images/science/ch02/tapeworm-photo.jpg', caption: 'Tapeworm' },
          { src: '/images/science/ch02/tapeworm-diagram.jpg', caption: 'Tapeworm, showing head and segments' }
        ] }
      ],
      [
        { type: 'p', text: "The second group of worms is the roundworms. A roundworm has a long, tube-shaped body with a digestive system made up of a tube with an opening at each end — food is taken in through the mouth opening, and wastes leave through the other. Most roundworms live in soil, where they eat dead plant and animal matter, though other roundworms are parasites that live in host animals — dogs must be treated to get rid of roundworms." },
        { type: 'p', text: "The third group of worms is the segmented worms. A segmented worm has a body divided into segments, or sections, which look like a series of little rings." }
      ],
      [
        { type: 'p', text: "Segmented worms are much more complex than flatworms or roundworms. A series of hearts pump blood through the worm's body, traveling in a system of closed tubes. Like roundworms, segmented worms have two body openings and a digestive system." },
        { type: 'p', text: "The earthworm is the best-known segmented worm. Earthworms live inside tunnels in wet soil, and their body structure allows them to move easily through it. Each segment, except the first and last, has four pairs of bristles — a bristle is a stiff, strong hair used for moving and for clinging to the walls of the tunnels they live in." },
        { type: 'image-group', images: [
          { src: '/images/science/ch02/earthworm-diagram.jpg', caption: 'Diagram of an earthworm' }
        ] }
      ],
      [
        { type: 'activity', text: "Hands-on: How does an earthworm look? How does it move? Materials: earthworm / metric ruler / hand lens / paper towel / pan or tray. Procedure: A. Carefully hold the earthworm in one hand. Use a hand lens to examine the earthworm. Measure the length of the earthworm's body. 1. How long is the earthworm's body? B. Count the number of body segments. 2. How many segments does the earthworm have? C. Find the mouth. Find the light-colored swelling on the earthworm's body. It is about one third from the front end of the body. It is used in reproduction. D. Gently run your index finger over the segments. You should be able to feel bristles on the segments. Look at the bristles with a hand lens. 3. Draw the earthworm. Label its parts. E. Place a moist paper towel in a pan or tray. Place the earthworm on the towel. F. Watch the earthworm move on the towel. 4. How do the segments change? 5. How does the earthworm use its bristles? Conclusion: 1. In your own words describe the parts of an earthworm's body. 2. Describe how the earthworm moves. Using science ideas: Place the earthworm in a container of loose moist soil. Use a hand lens to observe the way it behaves in the soil. How might the earthworm's behavior be helpful to the soil and to plants growing in the soil?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch02/earthworm-photo.jpg', caption: 'Earthworm' }
        ] }
      ],
      [
        { type: 'heading', text: "Animals With Spiny Skin" },
        { type: 'p', text: "What are echinoderms, and how do they look? If you have ever been to the seashore, you may have seen some echinoderms. An echinoderm is a spiny-skinned invertebrate that lives in the ocean — its body is hard and covered with spines, some short and some long." },
        { type: 'p', text: "A common echinoderm is the starfish. Most starfish have five arms that come out from the center part of the animal, and on the underside of each arm are two rows of tiny tube feet. A tube foot is a hollow structure with a sucker at the end — most echinoderms have tube feet." },
        { type: 'image-group', images: [
          { src: '/images/science/ch02/starfish-tubefeet.jpg', caption: 'Starfish and close-up of tube feet' },
          { src: '/images/science/ch02/sand-dollars.jpg', caption: 'Sand dollars' },
          { src: '/images/science/ch02/sea-cucumber.jpg', caption: 'Sea cucumber' }
        ] }
      ],
      [
        { type: 'p', text: "The starfish uses its tube feet to pull itself over the ocean floor, and to get food. When a starfish finds a clam, it begins a kind of tug-of-war — the clam protects itself by tightly closing its two shells together, and the starfish attaches its tube feet to both shells and pulls, trying to pry them apart. Sometimes the tug-of-war goes on for a long time, but the starfish almost always wins." },
        { type: 'p', text: "The starfish eats both oysters and clams, so people who gather this seafood do not like starfish. In the past, they tried to get rid of starfish by cutting them into pieces and throwing the pieces back into the ocean — but instead of solving the problem, this made it worse. Some of the starfish pieces grew into whole new starfish, because the starfish, like the planarian, can regenerate body parts that are missing. So the number of starfish only got larger." }
      ],
      [
        { type: 'heading', text: "Animals With a Soft Body" },
        { type: 'p', text: "What are mollusks, and how do they look? The clam and the octopus belong to a group of animals called mollusks. A mollusk is an invertebrate with a soft body — some mollusks have two outer shells, others live inside a one-piece shell, and some have no shell at all. Many mollusks live in the ocean, while others live in fresh water or on land." },
        { type: 'p', text: "The body of a mollusk is more complex than the body of an echinoderm — for example, the mollusk has the beginning of a true eye, as you can see on the body of a scallop. Mollusks also have a more complex system for pumping blood, which is pumped through blood vessels into spaces in the animal's body." },
        { type: 'image-group', images: [
          { src: '/images/science/ch02/scallop-liny-eyes.jpg', caption: 'Scallop with tiny eyes along its shell edge' }
        ] }
      ],
      [
        { type: 'p', text: "Clams, oysters, and scallops are two-shelled mollusks — the shells are held together by muscles, which open and close them like a hinge. These mollusks also have a part called a foot, made of a strong muscle, used for digging and for pulling the animal along the ocean floor." },
        { type: 'p', text: "Snails and slugs are other common mollusks. Both have a large muscular foot that gives off a layer of slime, which they glide along on. The main difference between them is the shell — slugs usually have no shell, while snails do, and the snail's shell protects it from enemies by giving it somewhere to hide. Limpets and periwinkles are two other mollusks in this group." },
        { type: 'image-group', images: [
          { src: '/images/science/ch02/foot-of-scallop.jpg', caption: 'Foot of a scallop' },
          { src: '/images/science/ch02/slug.jpg', caption: 'Slug' },
          { src: '/images/science/ch02/land-snail-leaf.jpg', caption: 'Land snail' },
          { src: '/images/science/ch02/limpet.jpg', caption: 'Limpet' },
          { src: '/images/science/ch02/periwinkles.jpg', caption: 'Periwinkles' }
        ] }
      ],
      [
        { type: 'p', text: "The squid and the octopus are two other common mollusks that have no shell. Both have long tentacles lined with suckers, which help them catch other animals for food. They also have an unusual way to protect themselves: when in danger, they give off a cloud of dark liquid called ink, which keeps them from being seen while they escape their enemy." },
        { type: 'p', text: "Mollusks such as clams, oysters, and scallops are a source of food for many people. In some countries certain land snails are gathered and cooked for food. The abalone is an ocean snail gathered by divers — its foot is so large that it is cut up and served as abalone steaks. Squid and octopus are also favorite foods of many people." },
        { type: 'image-group', images: [
          { src: '/images/science/ch02/octopus-full.jpg', caption: 'Octopus and close-up of suckers' },
          { src: '/images/science/ch02/squid.jpg', caption: 'Squid' }
        ] }
      ],
      [
        { type: 'p', text: "Some invertebrates produce pearls. Certain oysters that live in tropical waters make pearls that are very valuable — large, perfectly shaped pearls can be as valuable as some of the most expensive diamonds. A pearl forms inside the shell of an oyster when a grain of sand or other particle enters the shell. Cells inside the shell produce a material called nacre — also called mother-of-pearl — that coats the particle in many thin layers. After several years, the particle is completely covered by a bright, shiny pearl." },
        { type: 'image-group', images: [
          { src: '/images/science/ch02/oyster.jpg', caption: 'Oyster' },
          { src: '/images/science/ch02/pearl-oyster.jpg', caption: 'Pearl oyster' }
        ] }
      ],
      [
        { type: 'heading', text: "Animals With Jointed Legs" },
        { type: 'p', text: "What are the four main groups of arthropods? The arthropods make up the largest group of animals — some people think there may be as many as 10 million types. An arthropod is an invertebrate that has a segmented body and jointed legs. The body has two or three segments, and the number of jointed legs is used to divide the arthropods into groups." },
        { type: 'p', text: "All arthropods have a hard outer covering called the exoskeleton — in some arthropods it is harder than in others. It is like a skeleton on the outside of the animal's body, and it protects the soft parts within. Arthropods also have well-developed sense organs and a head with special mouth parts." },
        { type: 'image-group', images: [
          { src: '/images/science/ch02/ant-segmented-body.jpg', caption: 'Segmented body of an ant' },
          { src: '/images/science/ch02/ant-diagram-segments.jpg', caption: 'Segments of an ant' }
        ] }
      ],
      [
        { type: 'p', text: "There are four main groups of arthropods. The first includes millipedes and centipedes. A millipede looks very much like a worm with many legs — the word millipede means \"thousand legs\" (milli- means \"thousand\" and -pede means \"foot\"). Each segment of a millipede has two pairs of legs, and it is a harmless animal that eats plants, curling up into a ball when in danger." },
        { type: 'p', text: "A centipede is also wormlike but has fewer legs than a millipede. The word centipede means \"hundred legs\" (centi- means \"hundred\"). Unlike a millipede, the centipede eats other animals — it uses a pair of poison claws near its mouth to capture food and inject poison into its prey." },
        { type: 'image-group', images: [
          { src: '/images/science/ch02/millipede.jpg', caption: 'Millipede' },
          { src: '/images/science/ch02/centipede.jpg', caption: 'Centipede' }
        ] }
      ],
      [
        { type: 'p', text: "The second group of arthropods includes shrimps, lobsters, and crayfish — animals in this group are also called crustaceans. Almost all of them live in water: shrimps and lobsters in the ocean, and crayfish in fresh water. Crustaceans have five pairs of legs, and their exoskeleton is divided into two main parts. These arthropods move by muscles attached to their exoskeleton." },
        { type: 'p', text: "The third group of arthropods includes animals such as spiders, ticks, and mites. These animals have four pairs of legs and two main body parts. Most spiders are harmless, and many are useful because they kill insects that are problems for people — this is one reason spiders make webs." },
        { type: 'image-group', images: [
          { src: '/images/science/ch02/shrimp.jpg', caption: 'Shrimp' },
          { src: '/images/science/ch02/lobster.jpg', caption: 'Lobster' },
          { src: '/images/science/ch02/garden-spider.jpg', caption: 'Garden spider' }
        ] }
      ],
      [
        { type: 'p', text: "A few spiders, such as the black widow, are poisonous. Ticks and mites are parasites that live by sucking blood from other animals — ticks are also very annoying to pets such as dogs and cats." },
        { type: 'p', text: "The fourth and largest group of arthropods is the insects. There are more kinds of insects than all other animals and plants combined. An insect is an arthropod that has three pairs of legs and a body divided into three parts: the head, the thorax, and the abdomen. The thorax is the middle part of an insect's body, where the wings and legs attach; the abdomen is the rear part of the body." },
        { type: 'image-group', images: [
          { src: '/images/science/ch02/black-widow.jpg', caption: 'Black widow' },
          { src: '/images/science/ch02/tick-on-skin.jpg', caption: 'Tick on skin' },
          { src: '/images/science/ch02/wasp-parts-diagram.jpg', caption: 'Parts of an insect' }
        ] }
      ],
      [
        { type: 'p', text: "Insects have very unusual sense organs. Most adult insects have compound eyes — a compound eye is made up of thousands of lenses, and lets the insect detect motion very well. Bees, for example, can see flowers moving in a slight breeze, though they cannot see the details of the flower." },
        { type: 'p', text: "An insect's head has two feelers, or antennae, which help it smell and feel — and are sometimes used for tasting and hearing too." },
        { type: 'image-group', images: [
          { src: '/images/science/ch02/activity-insect-1.jpg', caption: 'Compound eyes of an insect' },
          { src: '/images/science/ch02/activity-insect-2.jpg', caption: 'Close-up of a compound eye' },
          { src: '/images/science/ch02/antennae-moth.jpg', caption: 'Antennae' }
        ] }
      ],
      [
        { type: 'activity', text: "Hands-on: Can you create an insect? Materials: egg carton / 8 pipe cleaners / several small buttons / scraps of fabric / 8 Styrofoam balls, 4 each of 2 different sizes / glue / construction paper / felt-tip pens / twist-ties / scissors / clay. Procedure: A. Use your imagination! Create your own insect. The insect does not have to look like any known insect, but it must have all the body parts needed by an insect. 1. How many body parts will your insect have? 2. How many legs will your insect have? B. You may use any of the materials supplied. You may bend and twist the pipe cleaners and the twist-ties. You may glue parts of the body together. 3. What are the names of the three parts of your insect's body? 4. To what parts of the insect's body are the legs attached? C. Try giving your insect special mouth parts. Decide whether you want your insect to chew, suck, or pierce with its mouth parts. 5. Is your insect beginning to look like any insect you have seen? Which one? D. Be sure you add antennae to your insect's head. 6. How does an insect use its antennae? Conclusion: 1. Insects have four common characteristics. What are they? 2. List all the parts of your insect. Next to each write what it does. Using science ideas: Describe the type of surroundings where your insect might live." }
      ],
      [
        { type: 'p', text: "Insects have special mouth parts formed for chewing, sucking, or piercing — the kind of mouth parts an insect has depends on the food it eats. Beetles and grasshoppers, for example, eat leaves, so their mouths have parts that cut and chew. Butterflies and moths have mouth parts that suck up juices from flowers. Mosquitoes have mouth parts for piercing skin and sucking blood." },
        { type: 'p', text: "An insect's body is covered by an exoskeleton that does not grow as the insect grows. When the covering gets too small, the insect molts — to molt is to shed the hard outer covering. The exoskeleton splits down the middle, the insect works its way out, and once the old covering is shed, it forms a new exoskeleton." },
        { type: 'image-group', images: [
          { src: '/images/science/ch02/tick-on-skin.jpg', caption: 'Molting exoskeleton' }
        ] }
      ],
      [
        { type: 'p', text: "Insects are both harmful and helpful. Some insects feed on other insects that destroy crops — the ladybug is an example of this kind of helpful insect. Many insects are also an important source of food for fish, birds, frogs, and other animals." },
        { type: 'p', text: "Many insects, though, are pests. An insect called the boll weevil damages the cotton crop. Termites, which live on wood, can destroy homes made mainly of wood. Some insects can even carry disease to animals and people — a mosquito, for example, carries the serious disease called malaria. So insects, as a group, are both helpful and harmful." }
      ],
      [
        { type: 'summary', text: "Scientists classify animals in groups by features that are alike." },
        { type: 'summary', text: "An animal with a backbone is called a vertebrate. An animal without a backbone is called an invertebrate." },
        { type: 'summary', text: "A sponge is an invertebrate with a simple body full of pores, connected to one another by narrow canals." },
        { type: 'summary', text: "The hydra, jellyfish, and sea anemone are invertebrates with stinging cells and tentacles." },
        { type: 'summary', text: "Scientists classify worms into three groups — flatworms, roundworms, and segmented worms." },
        { type: 'summary', text: "An echinoderm is a spiny-skinned invertebrate that lives in ocean waters." },
        { type: 'summary', text: "A mollusk is an invertebrate with a soft body. Some mollusks have two outer shells, some live inside a one-piece shell, and others have no shell at all." },
        { type: 'summary', text: "An arthropod is an invertebrate that has a segmented body, jointed legs, and a hard outer covering." }
      ],
      [
        { type: 'review', title: 'Reviewing the Chapter', sections: [
          {
            heading: 'Science Words',
            instructions: 'Complete each sentence using a science term from the chapter.',
            items: [
              { prompt: 'Scientists ___ animals by their structure.', answer: 'classify' },
              { prompt: 'Shrimps, lobsters, and clams are examples of ___.', answer: 'crustaceans' },
              { prompt: 'Another name for a spiny-skinned animal is ___.', answer: 'echinoderm' },
              { prompt: 'To shed the hard outer covering is to ___.', answer: 'molt' },
              { prompt: "The animal or plant on which a parasite lives is the ___.", answer: 'host' }
            ]
          },
          {
            heading: 'Science Words — Matching',
            instructions: 'Match each definition to the term it describes.',
            items: [
              { prompt: '1. Animal with a segmented body and jointed legs', answer: 'arthropod' },
              { prompt: '2. Segmented worm', answer: 'earthworm' },
              { prompt: '3. Wormlike animal with many legs', answer: 'centipede' },
              { prompt: '4. Invertebrate with a body full of holes', answer: 'sponge' },
              { prompt: '5. Animal or plant that depends on and harms another animal or plant', answer: 'parasite' },
              { prompt: "6. Middle part of an insect's body", answer: 'thorax' },
              { prompt: '7. Hard outer covering', answer: 'exoskeleton' },
              { prompt: '8. Hollow structure with a sucker at the end', answer: 'tube foot' },
              { prompt: "9. Insect's feelers", answer: 'antennae' },
              { prompt: '10. Flatworm that has two eyespots', answer: 'planarian' }
            ]
          },
          {
            heading: 'Understanding Ideas',
            items: [
              { prompt: "What are the three main body parts of an insect, and what is attached to each?", answer: "Head (antennae, mouth parts), thorax (legs and wings attach here), and abdomen (contains many internal organs)." },
              { prompt: "For each group — sponges, animals with stinging cells, segmented worms, animals with spiny skin, animals with hard shells (mollusks), and animals with jointed legs (arthropods) — name its special body part and give one example animal.", answer: "Sponges: pores connected by canals (e.g. orange sponge). Stinging-cell animals: tentacles with stinging cells (e.g. hydra). Segmented worms: bristles on a segmented body (e.g. earthworm). Spiny-skinned animals: tube feet (e.g. starfish). Mollusks: a muscular foot (e.g. clam or snail). Arthropods: jointed legs and an exoskeleton (e.g. insect or spider)." }
            ]
          },
          {
            heading: 'Using Ideas',
            items: [
              { prompt: 'Collect or draw pictures of each of the invertebrate groups you studied in this chapter, and make a chart of them.', answer: "Try it yourself — sketch or find a picture of one animal from each group (sponge, stinging-cell animal, flatworm/roundworm/segmented worm, echinoderm, mollusk, arthropod) and arrange them into a chart." }
            ]
          }
        ] }
      ]
    ]
  },
  "Ch.03 · Vertebrates": {
    title: "Animals With a Backbone",
    pages: [
      [
        { type: 'heading', text: 'Chapter 3 · Animals With a Backbone' },
        { type: 'p', text: "Can you imagine a baby that has a mass of over 7,000 kg and is over 7 m long? This is the mass and length of a baby blue whale when it is born. Its mother may have a mass of over 110,000 kg!" },
        { type: 'p', text: "The blue whale belongs to a group of animals called the vertebrates. Vertebrates are animals with a backbone. There are five main groups of vertebrates. Fish, frogs, snakes, birds, and dogs are examples of animals from each main group. In this chapter you will learn about the animals from each of the groups. You will see how the animals are different and how they are alike." },
        { type: 'image-group', images: [
          { src: '/images/science/ch03/blue-whale.jpg', caption: 'Blue whale' }
        ] }
      ],
      [
        { type: 'p', text: "Fish are vertebrates that live in water. They are cold-blooded animals. A cold-blooded animal is an animal whose body temperature changes with the temperature of the water or air around it. When the air or water around such an animal is cold, the animal becomes cold. A cold-blooded animal becomes warm when the air or water around it is warm." },
        { type: 'p', text: "The skeleton (skel'e tan) of a fish is simpler than that of other vertebrates. Most fish have skeletons made of bone. The shark and the sting- ray have skeletons made of cartilage (kar'ta lij). So some scientists believe that sharks and sting- rays are not true fish. Cartilage is a soft, bonelike material that bends. You can feel cartilage in the tip of your nose." },
        { type: 'image-group', images: [
          { src: '/images/science/ch03/trout.jpg', caption: 'Trout' },
          { src: '/images/science/ch03/shark.jpg', caption: 'Shark' }
        ] }
      ],
      [
        { type: 'p', text: "Most fish are covered with scales. A scale is a flat bony structure. Scales cover the body of a fish and protect it. Fish also have fins. A fin is a struc- ture on a fish that helps it move through the water. The drawing shows the different fins on a fish. How many fins can you count on this fish?" },
        { type: 'p', text: "Almost all living things need oxygen. Animals that live on land get oxygen from the air. You may wonder how fish get oxygen under water. There is oxygen dissolved in the water. Fish take in the oxygen found in water through their gills. Gills are thin, feathery structures that are filled with blood. Fish use gills for breathing. To breathe, a fish takes water into its mouth. The water then flows over the gills. Oxygen from the water goes into the blood in the gills. The blood in the gills picks up a waste material from the rest of the fish's body. This waste material is carbon dioxide. The carbon dioxide passes through the gills and then out of the body into the water. This is how the fish breathes under water." },
        { type: 'image-group', images: [
          { src: '/images/science/ch03/fish-scales-types.jpg', caption: 'Types of fish scales' },
          { src: '/images/science/ch03/fish-structure-diagram.jpg', caption: 'Structure of a fish' },
          { src: '/images/science/ch03/gills-diagram.jpg', caption: 'How gills work' }
        ] }
      ],
      [
        { type: 'heading', text: "Different Types of Fish" },
        { type: 'p', text: "Fish are found in both fresh water and salt water. They are found in many shapes and sizes. Some fish look very different from most other fish. The seahorse looks like a tiny horse. The eel has a long slender body and small scales." },
        { type: 'p', text: "Fish are a major source of food for people. For thousands of years fish have been gathered from streams, rivers, and oceans. Each year about 66 billion kg of fish are caught. This is enough to feed each person on earth about 17 kg of fish a year." },
        { type: 'image-group', images: [
          { src: '/images/science/ch03/different-types-of-fish.jpg', caption: 'Shark, flying fish, swordfish, skate, catfish, eel, and seahorse' }
        ] },
        { type: 'activity', text: "Finding Out: What does a fish scale tell about the age of a fish? Each year a fish adds another ring to its scales. You can tell the age of a fish by counting the rings in its scales. You will need a hand lens and some fish scales. Look at the fish scales with a hand lens. Count the number of rings on one scale. How many rings are there? How old is the fish? Do all the scales you looked at have the same number of rings? Try looking at the scales of other fish." },
        { type: 'image-group', images: [
          { src: '/images/science/ch03/activity-girl-fish-scale.jpg', caption: 'Finding Out: examining a fish scale with a hand lens' }
        ] }
      ],
      [
        { type: 'heading', text: "Amphibians" },
        { type: 'p', text: "What are the main characteristics of amphibians? An amphibian is a cold-blooded vertebrate that lives part of its life in water and part on land. Frogs, toads, and salamanders are some common amphibians. The outside of an amphibian's body is usually moist and slimy. Amphibians do not have scales." },
        { type: 'image-group', images: [
          { src: '/images/science/ch03/bullfrog.jpg', caption: 'Bullfrog' },
          { src: '/images/science/ch03/southern-toad.jpg', caption: 'Southern toad' }
        ] },
        { type: 'p', text: "Most adult amphibians live on land. They return to water to lay their eggs. A few amphibians spend almost their entire life in water. These include bullfrogs and some salamanders, such as mud puppies." },
        { type: 'image-group', images: [
          { src: '/images/science/ch03/salamander-drawing.jpg', caption: 'Salamander' }
        ] }
      ],
      [
        { type: 'p', text: "Most adult amphibians breathe through lungs. Lungs are organs through which animals get oxygen from air. The mud puppy does not have lungs — it has gills outside its body through which it can breathe under water. Amphibians with lungs cannot live completely in water, and must come to the surface to breathe air. Amphibians can also get oxygen through their skin." },
        { type: 'image-group', images: [
          { src: '/images/science/ch03/mud-puppy-gills.jpg', caption: 'Gills of a mud puppy' }
        ] },
        { type: 'heading', text: "Life Cycle of a Frog" },
        { type: 'p', text: "Amphibians such as frogs and toads go through several stages of growth during their life. Look at the drawings and follow the life of the frog. The frog lays its eggs in the water. Fishlike animals called tadpoles hatch from these eggs. Tadpoles live in water and have gills. As the tadpole gets older it grows a tail. At this stage the tadpole looks more like a fish. Then back legs and front legs form. The frog develops lungs and comes out on land. Adult frogs usually live on land and have lungs. Other amphibians go through stages of growth like this." },
        { type: 'image-group', images: [
          { src: '/images/science/ch03/frog-lifecycle-top.jpg', caption: 'Life cycle of a frog' },
          { src: '/images/science/ch03/frog-lifecycle-underwater.jpg', caption: 'Tadpole stages underwater' }
        ] }
      ],
      [
        { type: 'heading', text: "Reptiles" },
        { type: 'p', text: "What are the main characteristics of reptiles? A reptile is a cold-blooded vertebrate that has lungs and dry skin. Almost all reptiles have scales. Most reptiles live on land and lay eggs. Some give birth to live young. The eggs of reptiles are laid on land — these eggs have a tough covering that prevents the eggs from drying out on land." },
        { type: 'p', text: "There are four main groups of reptiles. These are the alligators and crocodiles, the snakes, the lizards, and the turtles." },
        { type: 'image-group', images: [
          { src: '/images/science/ch03/pine-snakes-eggs.jpg', caption: 'Pine snakes hatching from eggs' }
        ] }
      ],
      [
        { type: 'p', text: "Alligators and crocodiles make up one group of reptiles. They are large four-legged reptiles. They look alike, but their color and the shape of their snout help to tell them apart. Crocodiles are green and gray, while alligators are gray and black. Crocodiles have a more slender and pointed snout than do alligators. The two drawings show how the crocodile and the alligator are different. Can you tell them apart?" },
        { type: 'p', text: "Snakes make up the largest group of reptiles. They do not have legs, and their bodies are covered with thin scales. Snakes can be large or they can be small. The anaconda, from South America, can be more than 9 m long. The thread snake is only about 12 cm long." },
        { type: 'image-group', images: [
          { src: '/images/science/ch03/gator-croc-heads.jpg', caption: 'Alligator and crocodile snouts' },
          { src: '/images/science/ch03/anaconda.jpg', caption: 'Anaconda' }
        ] }
      ],
      [
        { type: 'p', text: "Snake eating mouse and snake's curved teeth. Snakes have an interesting way of eating — they swallow their food whole. The picture shows a snake with a whole mouse in its mouth. Most of the things snakes eat are larger than their mouth. When a snake eats an animal larger than its mouth, the snake's lower jaw separates from the upper jaw. This allows the snake's mouth to open very wide. Also, the snake's teeth are curved backward. This makes it hard for an animal to escape from the snake's jaws." },
        { type: 'p', text: "Another group of reptiles is the lizards. There are many different kinds of lizards. Many live in deserts and other hot, dry areas. Lizards have claws on their toes, as shown in the picture. The body of a lizard is covered with scales." },
        { type: 'image-group', images: [
          { src: '/images/science/ch03/snake-eating-mouse.jpg', caption: "Snake eating mouse and snake's curved teeth" },
          { src: '/images/science/ch03/lizard-clawed-foot.jpg', caption: 'Lizard and clawed foot' }
        ] }
      ],
      [
        { type: 'p', text: "The chameleon is one of the most interesting lizards. Chameleons live in trees and catch insects for food. They can change color. These lizards can change from brown to green to gray. The chameleon in the picture is changing color. These changes help these animals to blend in with their surroundings. How can this be helpful?" },
        { type: 'p', text: "Turtles make up the last group of reptiles. The body of a turtle is protected by a shell. When in danger, a turtle pulls its legs and head into its shell. How does this help it to survive? The turtles in the picture are box turtles. They can close their shells very tightly. Some turtles live on land. Others spend most of their time in water." },
        { type: 'image-group', images: [
          { src: '/images/science/ch03/chameleon.jpg', caption: 'Chameleon' },
          { src: '/images/science/ch03/box-turtles.jpg', caption: 'Box turtles' }
        ] }
      ],
      [
        { type: 'heading', text: "Birds" },
        { type: 'p', text: "What are the main characteristics of birds? Birds are warm-blooded animals that are covered with feathers. A warm-blooded animal is an animal whose body temperature stays the same even when the temperature of the air or water around it changes. Birds are vertebrates with lungs. Like reptiles, birds lay eggs. Their eggs are in a hard shell. Wings and feathers make birds different from other vertebrates. Most birds use their wings to fly. Some birds, such as penguins, have feathers and wings but cannot fly. Birds can be found living on land, in trees, and on water. What birds can be found on water?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch03/penguins.jpg', caption: 'Penguins' }
        ] }
      ],
      [
        { type: 'p', text: "The bones and feathers of birds are made in a special way to help birds fly. The bones are hollow and light. The feathers have a hollow central shaft. This shaft makes feathers strong but light. Some large birds may have as many as 25,000 feathers. All birds lose and replace their feathers during a year. This regular loss of feathers is called molting." },
        { type: 'p', text: "The major use of feathers is to help birds to fly. Feathers are also needed to keep birds warm. Some birds fluff their feathers when they are cold. This fluffing forms more air spaces between the feathers and helps to keep the birds warm. Ducks and geese have small fluffy feathers called down near their skin. Down traps air and helps to keep the birds warm. Perhaps you have a jacket or blanket filled with down. These small feathers help to keep your body warm." },
        { type: 'image-group', images: [
          { src: '/images/science/ch03/bird-bones.jpg', caption: 'Bird bones' },
          { src: '/images/science/ch03/down-feathers.jpg', caption: 'Down feathers' }
        ] }
      ],
      [
        { type: 'p', text: "Because birds are very active animals, they need a great deal of energy. So they eat a lot of food. Some birds spend most of their life hunting for food. The diet of birds is varied. Some birds eat nuts, while others eat seeds. Birds such as the one shown above eat oysters. Birds living near the water sometimes eat fish that they spear with their beaks. Still others, such as ducks and the flamingo below, eat tiny water plants and animals." },
        { type: 'image-group', images: [
          { src: '/images/science/ch03/oystercatcher.jpg', caption: 'Oyster catcher' },
          { src: '/images/science/ch03/snowy-egret.jpg', caption: 'Snowy egret and young' },
          { src: '/images/science/ch03/flamingo.jpg', caption: 'Flamingo' }
        ] }
      ],
      [
        { type: 'p', text: "Birds show a great variety in nests and nest building. The nests of some birds are built by the male bird. Others are built by the female bird. Still others are built by both male and female. Nests are of all shapes and sizes. Some nests, such as those of the weaverbirds, are extremely large. As many as 600 birds may work together to build huge nests. Nests can be made of twigs, leaves, or feathers. They can also be made of mud or other substances that birds find. Nests can hang from tree branches or rest on the ground. Some nests are even built under piles of rotting leaves." },
        { type: 'image-group', images: [
          { src: '/images/science/ch03/nests-weaverbirds.jpg', caption: 'Nests of weaverbirds' }
        ] },
        { type: 'p', text: "Some birds can be harmful to people. For example, pigeons can carry diseases that harm people's lungs. Pigeons are also pests because they damage buildings." },
        { type: 'image-group', images: [
          { src: '/images/science/ch03/nest-plover.jpg', caption: 'Nest of plover' }
        ] }
      ],
      [
        { type: 'activity', text: "What is the structure of a bird's feather and a bird's bone? Materials bird feather / scissors / hand lens / chicken bone / pliers / beef bone Procedure A. Look at the drawing of the bird feather on this page. Point out the central shaft and the side branches. Each side branch is called a barb. B. Look at a bird feather. Find the central shaft. Use scissors to cut through the central shaft. 1. Is the central shaft hollow or solid? C. Find the barbs on the feather. Gently pull some of the barbs apart, then put them together by pulling them through your fingers. 2. Why do you think the barbs can be locked together? D. Look at the feather with a hand lens. Draw the feather as you see it through a hand lens. E. Look at a chicken bone. Break it in half with pliers. 3. Describe what you see inside the chicken bone. F. Compare the chicken bone with the beef bone. 4. What are the differences between the chicken bone and the beef bone? Conclusion 1. Describe a few important features of a feather and a chicken bone. What features of a bird's feathers and bones help it to fly? 2. Why is a beef bone not suitable for flight?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch03/feather-diagram.jpg', caption: "Parts of a bird's feather" },
          { src: '/images/science/ch03/activity-feather-hand.jpg', caption: 'Examining a feather with a hand lens' },
          { src: '/images/science/ch03/activity-foot-hand.jpg', caption: 'Examining a claw with a hand lens' }
        ] }
      ],
      [
        { type: 'heading', text: "MAMMALS" },
        { type: 'p', text: "What are the main characteristics of mammals?" },
        { type: 'p', text: "The most complex group of vertebrates is the mammals. A mammal is a warm-blooded vertebrate that is usually covered with fur or hair. Mammals are different from other vertebrates in two main ways. First, the body of a mammal is all or partly covered with fur or hair. A very hairy mammal is the gorilla. A mammal with just a small amount of hair is the elephant." },
        { type: 'p', text: "A second way mammals differ from other vertebrates is that all mammals produce milk for their young. The picture shows springer spaniel puppies getting milk from their mother." },
        { type: 'image-group', images: [
          { src: '/images/science/ch03/springer-spaniel-pups.jpg', caption: 'Springer spaniel and pups' }
        ] },
        { type: 'p', text: "Mammals differ from each other in many ways. Most mammals live on land. A few mammals, such as whales and dolphins, live in water. There are great differences in the size of mammals. The blue whale is the largest mammal. It can grow to be as long as 32 m and have a mass of over" },
      ],
      [
        { type: 'sidebar', text: "110,000 kg. The common shrew is one of the smallest mammals. It is only about 10 cm long and has a mass of less than 3 g. These tiny mammals are insect eaters. Do you know? Suppose you find an animal that looks like this: It has a duck's bill and webbed feet. It has a tail like a beaver and fur on its body. It feeds its young milk. Strangely, it also lays eggs. How would you classify this animal? Is it a bird? Is it a reptile? Is it a mammal? This strange animal is an egg-laying mammal. It is called a duck-billed platypus (plat'e pas). The platypus lives in and around Australia." },
        { type: 'image-group', images: [
          { src: '/images/science/ch03/shrew.jpg', caption: 'Shrew' },
          { src: '/images/science/ch03/platypus.jpg', caption: 'Duck-billed platypus' }
        ] }
      ],
      [
        { type: 'p', text: "The young of most mammals develop inside the mother's body. Some mammals produce a large number of young at one time. For example, mice may give birth to as many as eight to ten young. Large mammals, such as elephants, usually have only one baby. The time needed for the young to grow inside the mother's body is not always the same. It varies from one kind of mammal to another. Large mammals take longer to grow than small mammals. A small mammal such as a hamster grows in 16 days. A large mammal such as a giraffe takes about 442 days. Dogs take about 63 days to grow in the mother's body. Whales grow in about 450 days." },
        { type: 'image-group', images: [
          { src: '/images/science/ch03/elephant-baby.jpg', caption: 'Elephant and baby' }
        ] }
      ],
      [
        { type: 'p', text: "Some mammal babies grow for a very short time inside the mother's body. When they are born, they are not fully formed. They are very small and helpless. They crawl into the mother's warm pouch and continue to grow there. The kangaroo and the opossum are mammals whose young develop in a pouch. The picture shows tiny opossum babies feeding inside their mother's pouch and a kangaroo with its young." },
        { type: 'image-group', images: [
          { src: '/images/science/ch03/opossums-feeding.jpg', caption: 'Opossums feeding' },
          { src: '/images/science/ch03/kangaroo-young.jpg', caption: 'Kangaroo with young' }
        ] },
        { type: 'p', text: "Some mammals are important to people. These are the mammals that are used for food and other products. Cattle, pigs, and sheep are raised for meat. Foods such as cheese, cream, and butter come from the milk produced by cows. Belts, shoes, footballs, and leather coats are products made from mammal skins." },
        { type: 'p', text: "Some mammals can be harmful to people. Rats are harmful mammals. Rats spread disease to humans. Often rats will eat stored food, such as fruits and grains. Millions of dollars are lost each year because of damage from rats." },
        { type: 'image-group', images: [
          { src: '/images/science/ch03/rat.jpg', caption: 'Rat' }
        ] }
      ],
      [
        { type: 'activity', text: "What are the characteristics of the five groups of vertebrates? Materials 5 small index cards / wire coat hanger / yarn / drawing paper / scissors / transparent tape / felt-tip pens or crayons / old magazines Procedure A. You are going to make a mobile showing how the vertebrates are grouped. Write the names of the five main groups of vertebrates on index cards. Using the yarn, attach the cards to the coat hanger as shown. 1. What are the five main groups of vertebrates? B. Cut five strips of drawing paper. On these strips list the main characteristics of each group of vertebrates. C. Using the yarn, attach the lists to the right cards. 2. Did you find any characteristics that appeared in more than one group? 3. What are these characteristics? In which groups did these characteristics appear? D. Below the list of characteristics, hang pictures of animals from each group. You may either draw the animals or cut pictures of animals out of magazines. Attach the pictures with yarn as shown. Conclusion What do all five groups of vertebrates have in common? Using science ideas You can use your mobile to play a science game called \"The Vertebrate Detective.\" Think of one of the animals hanging on the mobile. On an index card list five characteristics of this animal. Read these characteristics one at a time to the class. Have members of the class guess the animal you are thinking of." }
      ],
      [
        { type: 'summary', text: "Vertebrates are animals with a backbone." },
        { type: 'summary', text: "There are five major groups of vertebrates: fish, amphibians, reptiles, birds, and mammals." },
        { type: 'summary', text: "A fish is a cold-blooded vertebrate with fins. It uses gills to breathe under water. Most fish have scales." },
        { type: 'summary', text: "An amphibian is a cold-blooded vertebrate that lives part of its life in water and part on land." },
        { type: 'summary', text: "A reptile is a cold-blooded vertebrate that has lungs and dry skin. Most reptiles have scales and live on land." },
        { type: 'summary', text: "A bird is a warm-blooded vertebrate that has feathers and wings." },
        { type: 'summary', text: "A mammal is a warm-blooded vertebrate that is usually covered with fur or hair. It feeds its young milk." },
      ],
      [
        {
          type: 'review',
          title: 'Reviewing the Chapter',
          sections: [
            {
              heading: 'Science Words',
              instructions: "Write the term that best matches the definition. Not all the terms below will be used: warm-blooded, cartilage, down, cold-blooded, reptile, mammal, vertebrate, fins, gills.",
              items: [
                { prompt: "Soft, bonelike material in a shark's skeleton", answer: 'cartilage' },
                { prompt: 'Thin, feathery structures filled with blood and used in breathing', answer: 'gills' },
                { prompt: 'Type of animal whose body temperature stays the same even when the surrounding temperature changes', answer: 'warm-blooded' },
                { prompt: 'Cold-blooded vertebrate with lungs and dry skin', answer: 'reptile' },
                { prompt: 'Small, fluffy feathers near the skin', answer: 'down' },
                { prompt: 'Structures that help fish move through water', answer: 'fins' },
                { prompt: 'Animal with a backbone', answer: 'vertebrate' },
                { prompt: 'Warm-blooded vertebrate covered with fur or hair', answer: 'mammal' },
                { prompt: 'It is a cold-blooded vertebrate. Its body is covered with scales. It can change color for protection. What is it?', answer: 'A chameleon (a lizard)' },
                { prompt: 'It is a cold-blooded vertebrate. It hatches from an egg. It is fishlike. It will change into a frog. What is it?', answer: 'A tadpole' },
              ]
            }
          ]
        }
      ],
      [
        {
          type: 'review',
          title: 'Reviewing the Chapter',
          sections: [
            {
              heading: 'Understanding Ideas',
              instructions: 'Put the stages in order and describe what happens at each one.',
              items: [
                { prompt: "Describe, in order, the stages in a frog's life cycle from egg to adult.", answer: "Egg → a tadpole hatches with gills and a tail and lives in water → the tadpole grows back legs, then front legs → it develops lungs, loses its tail, and comes out onto land as an adult frog." },
                { prompt: 'Which animal has gills inside its body?', answer: 'A fish' },
                { prompt: 'Which animal has a pouch where its young finish developing?', answer: 'A marsupial mammal, such as a kangaroo or opossum' },
                { prompt: 'Which animal has scaly skin and feet with claws?', answer: 'A lizard (a reptile)' },
                { prompt: 'Which animal has gills outside its body?', answer: 'The mud puppy (a salamander that keeps its gills as an adult)' },
                { prompt: 'Which animal has teeth that curve backward?', answer: 'A snake' },
                { prompt: 'Which animal has a skeleton made of cartilage?', answer: 'A shark' },
              ]
            },
            {
              heading: 'Using Ideas',
              items: [
                { prompt: 'Keep a diary for a week. List all the vertebrates that you see during this time — living animals or ones you see on television or in films.', answer: 'Answers will vary — group the vertebrates you list by class: fish, amphibian, reptile, bird, or mammal, and note one characteristic that told you which group each one belongs to.' },
              ]
            }
          ]
        }
      ],
    ]
  },
  "Ch.04 · Living Communities": {
    title: "Living Communities",
    pages: [
      [
        { type: 'heading', text: 'Chapter 4 · Living Communities' },
        { type: 'p', text: "The picture shows a place in a desert in Arizona. A desert is a hot, dry place. It does not seem like a place where plants and animals could live. Yet snakes, lizards, insects, birds, rats, and rabbits make their homes in the desert. What plants do you see growing in the desert?" },
        { type: 'p', text: "In many ways the desert is like other parts of the earth. There are living and nonliving things in all parts of the earth. The living things affect each other and are also affected by the nonliving things around them. And the living things affect the nonliving things. In this chapter you will learn about the ways in which living and nonliving things affect each other. You will also learn about different ways in which the living and nonliving parts of our world can change." }
      ],
      [
        { type: 'image-group', images: [
          { src: '/images/science/ch04/desert-scene.jpg', caption: 'A desert in Arizona' }
        ] }
      ],
      [
        { type: 'heading', text: "THE LIVING AND NONLIVING WORLD" },
        { type: 'p', text: "All living things are surrounded by other living things. They are also surrounded by nonliving things. These living and nonliving things affect each other. Everything that surrounds and affects a living thing is called its environment (en vT'ran- ment). What are some living things in your home environment? What are some nonliving things? In what ways do these living and nonliving things affect each other? The study of how living and nonliving things affect each other is called ecology (e kol'e je). Scientists who study this subject are called ecologists." },
        { type: 'p', text: "Look at the picture of the fish tank. What living and nonliving things do you see? The living and nonliving things in the tank affect, or interact with, each other. Both the fish and the plants need water to survive. The plants give off oxygen, which goes into the water. The fish, which need oxygen to live, take the oxygen from the water. As they breathe, the fish give off carbon dioxide. The plants use the carbon dioxide to make food. Without the fish, the plants would die. And without the plants, the fish would die." },
        { type: 'image-group', images: [
          { src: '/images/science/ch04/fish-tank.jpg', caption: 'A fish tank ecosystem' }
        ] }
      ],
      [
        { type: 'p', text: "The fish tank is an example of an ecosystem (e'ka sis tom). An ecosystem is a group of living things and their nonliving environment. An ecosystem includes all the ways the living things in a group interact with each other. It also includes the way living things interact with their nonliving environment. An ecosystem can be as small as a single fish and a single plant in a fishbowl. Or an ecosystem can be as large as a forest, a desert, or an ocean. Look at the picture of the city park. The park is an ecosystem that may contain several smaller ecosystems. For example, under a rock you may find a small ecosystem that has many kinds of living things. A single tree in the park may be another ecosystem. The tree may be the home of squirrels, birds, and insects. Nongreen plants as well as green plants may also live on the tree." },
        { type: 'image-group', images: [
          { src: '/images/science/ch04/city-park.jpg', caption: 'City park' },
          { src: '/images/science/ch04/ecosystem-under-rock.jpg', caption: 'Ecosystem under a rock' }
        ] }
      ],
      [
        { type: 'heading', text: "LIVING THINGS IN ECOSYSTEMS" },
        { type: 'p', text: "You have learned that an ecosystem is made up of living and nonliving things. The living things in an ecosystem are known as a community (kemyii'ne te). A community is all the plants and animals that live and interact with each other in a place." },
        { type: 'p', text: "Communities are often named for the kind of place in which they live. There are forest, marsh, and pond communities. What are some other kinds of communities?" },
        { type: 'p', text: "Communities are made up of populations (popya la'shanz). A population is a group of the same kind of living thing in a community. For example, all the pine trees in this forest make up one population. It is a population of pine trees. Which picture shows a population of grass plants? What other populations are shown?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch04/pine-forest.jpg', caption: 'A population of pine trees' },
          { src: '/images/science/ch04/house-lawn.jpg', caption: 'A population of grass plants' }
        ] }
      ],
      [
        { type: 'p', text: "Members of the geese population can easily be seen in the picture of the marsh. What other animal populations live in a marsh? There are also many different plant populations in the marsh. The different populations in a community interact with each other. The geese feed on the marsh plants. When they feed on these plants, the geese make room for new plants to grow. The geese also release wastes into the soil. This enriches the soil and helps the new plants grow." },
        { type: 'activity', text: "What populations are found in an ecosystem? Materials meterstick or metric tape / 4 sticks / 4.5 m of string / hand lens / 2 jars with lids / small shovel / white paper Procedure A. Choose a place outdoors to study. Measure a square area of ground 1 m on each side. Push four sticks into the ground to mark the four corners of your square. Tie string around the sticks to enclose the area. B. Study the area closely for several minutes. Look for moving insects or other animals. Make a list of all the kinds of animals and plants that you see. Use a hand lens to help you see small plants and animals. 1. How many kinds of animals do you see? 2. How many kinds of plants do you see? C. Collect a sample of each kind of plant and animal you find. Put these samples in a jar. D. Use a small shovel to collect a sample of the soil. Put this sample in another jar. E. Pour the soil sample onto a sheet of white paper. Examine the sample with a hand lens. Look for living things. Look at the samples in the other jar. 3. What living things can you identify? Conclusion 1. What populations did you find in the ecosystem you studied? 2. In what ways might these populations affect each other? Using science ideas Suppose you studied this same area at another time of the year. How might this affect the number and kinds of populations you could see? Explain." },
        { type: 'image-group', images: [
          { src: '/images/science/ch04/geese-marsh.jpg', caption: 'Geese in a marsh' },
          { src: '/images/science/ch04/marsh-inset-column.jpg', caption: 'Cattails, dragonfly, snake, salamander, and fish' }
        ] }
      ],
      [
        { type: 'p', text: "Every living thing in a community has a special place in which it is usually found. The special place in a community in which a plant or animal lives is called its habitat (hab'a tat). You can think of an ecosystem as the neighborhood that a living thing is part of. The habitat can be thought of as its address in that neighborhood." },
        { type: 'p', text: "Within a community there are many habitats. In a forest the soil is the habitat of ants and earthworms. A rotten tree stump is the habitat of termites. Squirrels live in the trees. Mosses grow on the forest floor, in the shade of trees. Ants and earthworms, termites, squirrels, and mosses each have their own habitat. But these living things are all part of the same community." },
        { type: 'image-group', images: [
          { src: '/images/science/ch04/forest-habitats.jpg', caption: 'Some forest habitats' }
        ] }
      ],
      [
        { type: 'p', text: "The populations and habitats in a desert are different from those in a forest. Look at the picture. The cactus plant is the habitat of the elf owl. The habitats of many other desert animals are burrows under the ground." },
        { type: 'p', text: "The habitat of a plant or animal supplies it with many of the things that it needs to survive. Some living things are able to live in more than one habitat. Others can live in only one habitat. For example, flies can live in many habitats. They move to different places to get food. Mice can also live in more than one habitat. They are found in city buildings as well as in country fields." },
        { type: 'image-group', images: [
          { src: '/images/science/ch04/elf-owl-cactus.jpg', caption: 'Elf owl in nest in saguaro cactus' },
          { src: '/images/science/ch04/mouse-city.jpg', caption: 'Mouse in city building' },
          { src: '/images/science/ch04/mouse-field.jpg', caption: 'Mouse in country field' }
        ] }
      ],
      [
        { type: 'p', text: "Some animals are very limited in their habitat. Trout can only live in cool streams. The koala (koa'le) of Australia eats only one kind of plant. It eats the leaves of the eucalyptus (yu ke lip'tes) tree. So the koala can only live where this kind of tree grows. Food also limits the habitat of the panda. It only eats bamboo. How many different habitats could you live in?" },
        { type: 'sidebar', text: "Do you know? Panda populations are in danger. There may be only 1,000 pandas left in the wild. The reason for this is the amount of food available. Pandas live in forests in China where bamboo grows. Bamboo is the main food of pandas. The growth cycle of bamboo takes 100 years to complete. Every 100 years bamboo plants flower, produce seeds, and then die. It takes many years for new bamboo plants to grow. In the past, when bamboo plants died, pandas moved to other parts of the forests to find growing bamboo. But huge farms have been built in some parts of the forests. The pandas will not cross these farms. So they starve. In one case, farmers found the bodies of more than 130 starved pandas." },
        { type: 'image-group', images: [
          { src: '/images/science/ch04/koala-eating.jpg', caption: 'Koala eating eucalyptus leaf' },
          { src: '/images/science/ch04/panda-bamboo.jpg', caption: 'Panda eating bamboo' }
        ] }
      ],
      [
        { type: 'p', text: "Many plants and animals share the same habitat. Earthworms share the soil with many plants. Termites share a rotten tree stump with ants and other insects. Birds share their tree habitat with squirrels. Although they share the same habitat, the way these animals live may be very different from each other. The role that each living thing plays in a habitat is called its niche (nich)." },
        { type: 'p', text: "Some squirrels and birds share the same habitat. Yet these animals each have a different niche. Squirrels gather nuts and stay close to their habitat. Some birds are insect eaters. They travel great distances from their habitat to get food. Both animals share the same habitat. But they do not have a great effect on each other." },
        { type: 'p', text: "Sometimes the niche of one population does affect other populations. A creek is the habitat of a population of beavers. The beavers build dams across the creek. The dams they build create ponds. The ponds become the habitat of fish and plants. The beavers also cut down many trees. How does this affect the tree population?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch04/remote-cardinal.jpg', caption: 'Remote cardinal' },
          { src: '/images/science/ch04/red-squirrel.jpg', caption: 'Red squirrel' },
          { src: '/images/science/ch04/beaver-dam.jpg', caption: 'Beaver cutting down tree and building dam' }
        ] }
      ],
      [
        { type: 'heading', text: "CHANGES IN POPULATIONS" },
        { type: 'p', text: "What factors affect the size of a population?" },
        { type: 'p', text: "Ecologists study communities of living things. They try to find out what living things are present. They also want to know the size of each population. They try to learn whether the populations are changing in size. Ecologists want to know if populations are getting larger, getting smaller, or staying the same." },
        { type: 'p', text: "When an animal population changes in size, it often means there is a change in the birth rate or the death rate. The birth rate is the number of animals that are born in a period of time. What is the death rate? Many factors can cause a change in the birth rate or the death rate." },
        { type: 'image-group', images: [
          { src: '/images/science/ch04/ecologist-bird-population.jpg', caption: 'Ecologist studying a bird population' }
        ] }
      ],
      [
        { type: 'p', text: "Why might the birth rate of a population go up? Suppose a deer population has a large supply of food and water. Deer eat plants. If the deer are healthy, many will live long enough to produce young deer. So the birth rate will go up." },
        { type: 'p', text: "As the birth rate goes up, the deer population will get larger. After a while, the kinds of plants that deer eat will be scarce. Some deer may move away in search of food. What will this do to the size of the deer population? The deer that stay will still have little food. Some deer will get sick and die. Other deer may become very weak. They may be unable to run from other animals that hunt them for food. The size of a population may also change because of a sudden change in the amount of food that can be found. Suppose a fire or a disease destroys the deer's food source. Then the death rate of the deer population would go up. As the death rate goes up, population size goes down." },
        { type: 'image-group', images: [
          { src: '/images/science/ch04/deer-eating.jpg', caption: 'Young male white-tailed deer eating' },
          { src: '/images/science/ch04/deer-population.jpg', caption: 'Buck and does, members of a white-tailed deer population' }
        ] }
      ],
      [
        { type: 'p', text: "The size of a population may also be affected by the presence of a predator (pred'a tor). A predator is an animal that hunts other animals for food. The animal that is hunted is the prey (pra). The picture shows a predator with its prey. The predator is a lynx (lingks). A lynx is a small catlike animal. The prey is a snowshoe rabbit. Both animals live in the United States and Canada." },
        { type: 'p', text: "Suppose the number of snowshoe rabbits goes up. Then the number of lynx goes up, too. This is because the lynx now have a larger food supply. But an increase in the lynx population means more rabbits will be eaten. After a while, there will be very few rabbits left. With less food, many of the lynx will starve to death. This decreases the number of lynx. What will then happen to the size of the rabbit population?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch04/lynx-rabbit.jpg', caption: 'Lynx and snowshoe rabbit' }
        ] }
      ],
      [
        { type: 'activity', text: "What factors affect the size of a population? Materials metric ruler / buttons Procedure A. Draw a grid such as the one shown. Each box should be 2 cm on a side. There should be six squares across and six squares down. The grid represents a forest. B. Suppose each box represents the amount of space, food, and water needed by one deer. Use buttons to represent deer. Begin with two deer. Put each deer into a different box on the grid. C. Imagine that a year has passed. The deer population has doubled in size. Add the correct number of buttons to the grid. 1. How many deer are there now? D. Another year passes and the deer population has doubled again. Add the correct number of buttons to the grid. 2. How many deer are there now? E. The next year three deer die of disease. Remove three buttons. Then the remaining deer population doubles once again. Add the correct number of buttons to the grid. 3. How many deer are there now? 4. Suppose that from now on, the deer population doubles each year and no more deer die. In how many more years will there be too many deer for the amount of space, food, and water in the forest? Conclusion 1. What is the greatest number of deer that could live in the forest? 2. What are some reasons for a decrease in the size of a population?" },
      ],
      [
        { type: 'heading', text: "CHANGES IN COMMUNITIES" },
        { type: 'p', text: "You learned that a sudden major change, such as a fire, can affect the size of populations. Sudden changes can also affect whole communities." },
        { type: 'p', text: "On May 18, 1980, a volcano in Washington erupted. The volcano, Mount St. Helens, exploded with great force. The force was equal to almost 10 million metric tons of dynamite. One picture shows how the area looked before the blast. The other shows the same area 4 months after the blast." },
        { type: 'image-group', images: [
          { src: '/images/science/ch04/mt-st-helens-before.jpg', caption: 'Mount St. Helens before the eruption' },
          { src: '/images/science/ch04/mt-st-helens-after.jpg', caption: 'Mount St. Helens 4 months after the eruption' }
        ] }
      ],
      [
        { type: 'p', text: "Millions of trees were blown down. Many plants were burned or covered with layers of ash as much as 180 m deep. Scientists believe that thousands of bear, deer, and other animals lost their lives. Few living things in the area survived." },
        { type: 'image-group', images: [
          { src: '/images/science/ch04/trees-blown-down.jpg', caption: 'Trees blown down by eruption' }
        ] },
        { type: 'p', text: "A fire destroyed many square kilometers of the forest below. Trees, shrubs, grasses, and other plants were burned in the fire. Many animals were also killed. Among these were snakes, lizards, rabbits, and baby birds. Some animals were able to escape the fire, and so they lived. But many of the animals that lived lost their food supply and their habitat." },
        { type: 'image-group', images: [
          { src: '/images/science/ch04/forest-fire-colorado.jpg', caption: 'Colorado forest destroyed by fire' }
        ] }
      ],
      [
        { type: 'p', text: "People also cause changes in communities. The picture shows a major change in a redwood forest. People are cutting down the trees to use the wood. What changes might result from clearing the trees in this forest? In what ways are these changes like the changes from a forest fire? What are some living things that will lose their habitat?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch04/redwood-clearing.jpg', caption: 'People clearing a redwood forest' }
        ] }
      ],
      [
        { type: 'activity', text: "Finding out: What changes have occurred in your environment? Interview some adults who have lived in your neighborhood for a long time. Find out what the area was like many years ago. What changes have there been? Find out whether each change was brought about by people or was a natural change. Ask about the kinds of plants and animals that lived in the neighborhood. Find out how these living things were affected by each change. Be sure to ask about the effect that the changes might have had on people." },
        { type: 'image-group', images: [
          { src: '/images/science/ch04/interview-photo.jpg', caption: 'Interviewing an adult about neighborhood changes' }
        ] }
      ],
      [
        { type: 'p', text: "What happens after a sudden major change destroys an ecosystem? The same community does not come back right away. It may take 100 or more years for it to return. During this time there are many changes in the kinds of living things in an ecosystem. The series of changes in the communities of an ecosystem is called succession (sek sesh'en)." },
      ],
      [
        { type: 'p', text: "These drawings show succession in a forest after a fire." },
        { type: 'p', text: "1. Before the fire a forest of beech and maple trees is the habitat of many living things. 2. A fire burns the trees and other plants. 3. Several years after the fire the area has become a field. There are grasses and other low plants. Insects, birds, groundhogs, and other animals live in the field. 4. In a few years shrubs and young trees grow. 5. The beech and maple trees reappear after 100 years. What animals live in the forest?" },
        { type: 'p', text: "Ecologists have found that there are different stages in the succession of any ecosystem. The first stage of succession is called the pioneer (pi anir') stage. What is the number of the drawing that shows the pioneer stage in the succession of the forest? This picture shows the beginning of the pioneer stage after the Mount St. Helens blast. New plants are growing out of the ash." },
        { type: 'image-group', images: [
          { src: '/images/science/ch04/succession-panel-1.jpg', caption: 'Succession after a fire, stage 1' },
          { src: '/images/science/ch04/succession-panel-2.jpg', caption: 'Succession after a fire, stage 2' },
          { src: '/images/science/ch04/succession-panel-3.jpg', caption: 'Succession after a fire, stage 3' },
          { src: '/images/science/ch04/succession-panel-4.jpg', caption: 'Succession after a fire, stage 4' },
          { src: '/images/science/ch04/succession-panel-5.jpg', caption: 'Succession after a fire, stage 5' },
          { src: '/images/science/ch04/pioneer-mt-st-helens.jpg', caption: 'Pioneer stage, Mount St. Helens' }
        ] }
      ],
      [
        { type: 'p', text: "The last stage in the process of succession is called the climax (klf'maks) stage. Which drawing shows the climax stage? The climax stage in a community is usually stable. This means that it rarely changes. What might cause it to change?" },
        { type: 'p', text: "Many times succession does not result from a sudden change. Succession is more often a natural process in an ecosystem. These drawings show succession in a pond community." },
        { type: 'p', text: "1. Many kinds of plants and animals live in and around the pond. Each year some animals and many plants die and sink to the bottom. 2. After many years the remains of once-living things form soil and the pond fills in. 3. As the pond fills in, a marsh develops. The marsh plants grow and die. 4. In time the marsh dries up and a field develops. Grasses and shrubs grow in the field. A few years later trees appear. 5. Finally a forest community develops. What is this last stage of succession called?" },
      ],
      [
        { type: 'summary', text: "The environment is everything that surrounds and affects a living thing." },
        { type: 'summary', text: "An ecosystem is a group of living things, their nonliving environment, and the interactions between them." },
        { type: 'summary', text: "A community is all the plants and animals that live and interact with each other in a place." },
        { type: 'summary', text: "A population is a group of the same kind of living thing in a community." },
        { type: 'summary', text: "A habitat is the special place in a community in which a plant or animal lives." },
        { type: 'summary', text: "The role that each living thing plays in its habitat is called its niche." },
        { type: 'summary', text: "Many factors affect the size of populations." },
        { type: 'summary', text: "Succession is the series of changes in the communities of an ecosystem." },
      ],
      [
        {
          type: 'review',
          title: 'Reviewing the Chapter',
          sections: [
            {
              heading: 'Science Words',
              instructions: 'Use a science term from the chapter to complete each sentence.',
              items: [
                { prompt: 'A group of living things and their environment is a/an ___.', answer: 'ecosystem' },
                { prompt: 'The series of changes in the communities of an ecosystem is called ___.', answer: 'succession' },
                { prompt: 'All the plants and animals that live and interact with each other in a place is called a/an ___.', answer: 'community' },
                { prompt: 'The special place in a community in which a plant or animal lives is called its ___.', answer: 'habitat' },
                { prompt: 'The study of how living and nonliving things affect each other is called ___.', answer: 'ecology' },
                { prompt: 'Everything that surrounds and affects a living thing is called its ___.', answer: 'environment' },
                { prompt: 'The last stage of succession is called the ___ stage.', answer: 'climax' },
                { prompt: 'A group of the same kind of living thing in a community is called a/an ___.', answer: 'population' },
                { prompt: 'The role that each living thing plays in a habitat is called its ___.', answer: 'niche' },
                { prompt: 'The first stage of succession is called the ___ stage.', answer: 'pioneer' },
                { prompt: 'It is an animal that hunts other animals for food. What is it?', answer: 'A predator' },
                { prompt: 'It is an animal that is hunted by other animals for food. What is it?', answer: 'Prey' },
              ]
            }
          ]
        }
      ],
      [
        {
          type: 'review',
          title: 'Reviewing the Chapter',
          sections: [
            {
              heading: 'Understanding Ideas',
              instructions: 'A cause makes things happen. An effect is what happens. For each pair, say which is the cause and which is the effect.',
              items: [
                { prompt: 'A population of predators increases in size. / A population of prey increases in size.', answer: 'Cause: the prey population increases (more food for predators). Effect: the predator population increases.' },
                { prompt: 'A marsh develops. / Many plants and animals die and sink to the bottom of a shallow pond.', answer: 'Cause: plants and animals die and sink, filling the pond with soil. Effect: a marsh develops.' },
                { prompt: 'A population of predators increases in size. / A population of prey decreases in size.', answer: 'Cause: the predator population increases. Effect: the prey population decreases (more of them are eaten).' },
                { prompt: 'Many members of a deer population starve to death. / A fire burns all the plants in a forest.', answer: 'Cause: the fire burns the plants the deer eat. Effect: the deer starve.' },
                { prompt: 'Put the stages of pond succession in order and describe each one.', answer: 'An open pond with living things dying and sinking to the bottom → the remains fill the pond with soil → a marsh develops as the pond fills in → the marsh dries into a field with grasses and shrubs, then trees appear → a forest community develops (the climax stage).' },
              ]
            },
            {
              heading: 'Using Ideas',
              items: [
                { prompt: 'Collect old magazines and cut out pictures that show different communities. List as many plant and animal populations as you can see in each.', answer: 'Answers will vary — for each picture, name the community type (forest, pond, desert, and so on) and list the distinct populations you can identify in it.' },
              ]
            }
          ]
        }
      ],
    ]
  },
  "Ch.05 · Building Blocks of Matter": {
    title: "Building Blocks of Matter",
    pages: [
      [
        { type: 'heading', text: 'Chapter 5 · Building Blocks of Matter' },
        { type: 'p', text: "Have you ever wondered what things are made of? Look at all the many things in the picture. What is an orange made of? An apple? A strand of hair? A piece of glass? A brick? Air?" },
        { type: 'p', text: "For thousands of years people have asked such questions. The answers have taken a long time to find. Scientists working all over the world at different times have found some of the answers." },
        { type: 'p', text: "In this chapter you will learn how scientists study the world around them. You will find out about the smallest particles that things are made of. You will learn about some common materials that are formed of these particles. You will also read about the special names scientists use to talk about these materials." },
        { type: 'image-group', images: [
          { src: '/images/science/ch05/street-scene-shopping-cart.jpg', caption: 'A city street, full of things made of matter' }
        ] }
      ],
      [
        { type: 'image-group', images: [
          { src: '/images/science/ch05/fruit-vegetable-stand.jpg', caption: 'A fruit and vegetable stand — how many different kinds of matter can you find?' }
        ] }
      ],
      [
        { type: 'heading', text: 'Studying Matter' },
        { type: 'p', text: "How do scientists study the world around them? Scientists study the world around them. They have found that all things are alike in some ways. All things are made up of matter. Matter is anything that has mass and takes up space. Mass is a measure of the amount of matter in an object. An elephant has more mass than a mouse. An iceberg has more mass than an ice cube. Scientists are curious about what makes up matter." },
        { type: 'p', text: "How do scientists study matter? They use their senses. The senses of sight, smell, hearing, taste, and touch help scientists learn about matter. Sometimes scientists use special devices to study matter. They use devices to see very small things" },
        { type: 'image-group', images: [
          { src: '/images/science/ch05/collecting-water-samples.jpg', caption: 'Collecting water samples' },
          { src: '/images/science/ch05/using-a-microscope.jpg', caption: 'Using a microscope' }
        ] }
      ],
      [
        { type: 'p', text: "Using a telescope or things that are very far away. They use microscopes to see very small objects. They use telescopes to study the stars. All the scientists in the pictures are gathering information about matter." },
        { type: 'p', text: "Scientists have learned that all matter is made of small particles. They have never seen these particles with the unaided eye. From the results of tests, scientists believe that the particles exist." },
        { type: 'p', text: "Scientists make guesses about many things they cannot test directly. They make guesses about what the inside of the earth is like. They make guesses about what the stars are made of. So far, scientists have not been able to drill into the center of the earth. They have not yet traveled to a star. But they have made guesses about the matter in these places." },
        { type: 'image-group', images: [
          { src: '/images/science/ch05/telescope.jpg', caption: 'Using a telescope' }
        ] }
      ],
      [
        { type: 'p', text: "The guesses that scientists make are based on many careful studies. These studies give scientists clues about things that they cannot see or test directly. Indirect evidence (in da rekt' ev'a dans) is a set of clues that scientists use to make guesses about things they cannot see or test directly." },
        { type: 'p', text: "The picture shows two closed boxes. An umbrella is inside one box. A fish bowl is inside the other box. Guess which box holds the umbrella. You probably guessed box A. What clues did you base your guess on? These clues are indirect evidence of what is inside each box." },
        { type: 'p', text: "The girl in the picture cannot see what is in the box. By shaking the box, she is trying to find out what is inside. By holding the box in her hands, she is learning about its mass." },
        { type: 'image-group', images: [
          { src: '/images/science/ch05/boxes-ab.jpg', caption: 'Two closed boxes, A and B' },
          { src: '/images/science/ch05/girl-collecting-evidence.jpg', caption: 'Collecting indirect evidence' }
        ] }
      ],
      [
        { type: 'p', text: "As you have read, scientists use indirect evidence to find out about the world around them. They gather facts, or data, about things they cannot observe directly. Scientists use indirect evidence to learn about distant objects. They also use indirect evidence to study very small objects." },
        { type: 'activity', text: "What can you learn from indirect evidence? Materials: sealed box with unknown object / metric ruler / balance and masses / magnet. Procedure: A. Lift and shake the box. Use the balance to measure the object's mass. Move the magnet along the outside of the box. Measure the box. 1. What happens when you lift and shake the box? B. Gather all the information you can. Make a chart like the one below. List each thing you did and what you learned (result of shaking, effect of magnet, mass, size of box). C. Study your chart. 2. From your information, what do you guess is in the box? D. Open the box and look inside. Compare your guess with what actually is in the box. 3. In what ways was your guess correct? 4. In what ways was it wrong? Conclusion: You have just collected indirect evidence. What can you learn from indirect evidence? Using science ideas: List some other ways you can learn about the contents of a sealed box." },
      ],
      [
        { type: 'heading', text: 'The Atom' },
        { type: 'p', text: "Scientists have problems studying matter they cannot see. They use indirect evidence to make guesses about what matter is made of. They have found that all matter is made up of small particles. Each particle is called an atom (at'am). An atom is the basic unit of all matter. Atoms are very small. Suppose a million of the smallest atoms were stacked on top of one another. The stack would not be as thick as this page." },
        { type: 'p', text: "Scientists must use indirect evidence to learn about atoms. Can you explain why? They use their indirect evidence to make models of atoms." },
        { type: 'p', text: "A model is a way to describe how something looks or acts. A model can be made of wood or clay. Or a model can be a picture. A model can even be words that describe an idea." },
        { type: 'p', text: "Have you ever made a model of a ship, a plane, a house, or a car? The picture shows a model of an airplane. This model is much smaller than the real thing. But models of atoms are much larger than real atoms." },
        { type: 'image-group', images: [
          { src: '/images/science/ch05/model-airplane.jpg', caption: 'Model airplane' }
        ] }
      ],
      [
        { type: 'p', text: "For many years scientists have been making models of the atom. What do the models show? Scientists think the atom has a central part called a nucleus (nu'kle as). The nucleus of an atom contains two kinds of particles, protons (pro'tonz) and neutrons (nu'tronz). Protons and neutrons are tightly packed together in the nucleus. Tiny particles called electrons (i lek'tronz) travel around the nucleus. The drawing shows a model of a hydrogen atom." },
        { type: 'image-group', images: [
          { src: '/images/science/ch05/hydrogen-atom-model.jpg', caption: 'Model of a hydrogen atom' }
        ] },
        { type: 'p', text: "An atom is almost all empty space. Suppose you were to make a model of a hydrogen atom. The nucleus of the atom would be the size of an orange. The electrons would be in the space outside the orange. Then your model of the atom would be very large. It would be about 22 football fields across! The electrons in your model would be very small. They would each be smaller than the head of a pin. The electrons would be moving quickly all around the orange. This shows that in a real atom there is mostly empty space between the nucleus and the electrons." },
      ],
      [
        { type: 'heading', text: "Elements" },
        { type: 'p', text: "What is an easy way to write the names of elements? Some kinds of matter cannot be broken down into simpler kinds of matter. Suppose a silver bar is broken down into the smallest particle that is still silver. The smallest particle of the silver bar would be a silver atom. A silver atom cannot be broken down into a simpler kind of matter and still be silver." },
        { type: 'image-group', images: [
          { src: '/images/science/ch05/silver-candlestick.jpg', caption: 'Silver candlestick' },
          { src: '/images/science/ch05/silver-bar.jpg', caption: 'Silver bar' }
        ] },
        { type: 'p', text: "Silver is an element (el'a ment). An element is matter that is made up of only one kind of atom. It is a basic kind of matter. The smallest particle of an element is an atom." },
        { type: 'p', text: "Scientists have discovered 106 different elements. The atoms of these elements are different from one another. One way in which they differ is in the number of protons. Different atoms have different numbers of protons. For example, an atom of silver has 47 protons. An atom of gold has 79 protons. Of the 106 elements, 92 occur naturally on the earth." },
      ],
      [
        { type: 'p', text: "The other 14 elements have been made by scientists using special machines. The picture shows objects made mainly of only one element. Can you name the elements that make up the objects in the picture?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch05/objects-one-element.jpg', caption: 'Objects made mainly of one element' }
        ] },
        { type: 'p', text: "Each of the elements has its own symbol. A symbol is a short way to write the name of an element. The symbol stands for the name of the element. Why do scientists use symbols? They find it easier and quicker to write the symbol than to write the whole name of the element. Scientists all over the world use the same symbols." },
        { type: 'sidebar', text: "Do you know? Some of the elements were named in an interesting way. The element tungsten was discovered in Sweden and in Spain at the same time. In Sweden it was found in a heavy yellow rock. The element was named tungsten. The name comes from two Swedish words. Tung means \"heavy\" and sten means \"stone.\" The Spanish scientists called the same element wolfram. It was found in a mineral called wolframite. Today in most parts of the world the element is called wolfram. In the United States it is called tungsten. But it is known by the symbol W. The picture shows a bulb with a tungsten filament." },
        { type: 'image-group', images: [
          { src: '/images/science/ch05/tungsten-bulb.jpg', caption: 'Light bulb with a tungsten filament' }
        ] }
      ],
      [
        { type: 'activity', text: "Finding out: How can you group the elements? One way scientists group the elements is to put all metals in one group and all nonmetals into a second group. Most metals are good conductors of electricity and are shiny. Most nonmetals are poor conductors of electricity and are not shiny. Many nonmetals are gases. Which of the objects shown here is made mainly of a metal? Which is made mainly of a nonmetal? Which of the elements in the following list are metals? Which are nonmetals? aluminum, carbon, helium, lead, nickel, oxygen." },
        { type: 'image-group', images: [
          { src: '/images/science/ch05/finding-out-metals-nonmetals.jpg', caption: 'A bottle, a watch, and coins — which are made mainly of metal?' }
        ] },
        { type: 'image-group', images: [
          { src: '/images/science/ch05/helium-balloons.jpg', caption: 'Helium-filled balloons' }
        ] },
        { type: 'p', text: "The table on the next page lists some elements and their symbols. It describes how the elements look. Look at the list of symbols. You will see that sometimes the symbol for an element is the first letter of its name. For example, the symbol for carbon is C. Sometimes the symbol is two letters. For example, the symbol for calcium is Ca. A two-letter symbol is sometimes used because the names of some elements begin with the same letter. So the symbol Ca stands for calcium and the symbol Co stands for cobalt." },
        { type: 'p', text: "Look at the symbol for iron. It is Fe. The word for iron in Latin is ferrum (fer'em). So the symbol for iron comes from that word. Find the symbol for silver. It is Ag. The word for silver in Latin is argentum (ar jen'tam). The symbol for silver comes from that word. The symbols for some other elements also come from their names in Latin and other languages. Find mercury in the table. It is an unusual metal. Is mercury a solid, a liquid, or a gas at room temperature?" },
      ],
      [
        { type: 'image-group', images: [
          { src: '/images/science/ch05/diamond-carbon.jpg', caption: 'Diamond, a form of carbon' }
        ] },
        { type: 'activity', text: "Some common elements — Element: symbol, description. Calcium: Ca, silver-white metal. Carbon: C, black solid or colorless crystal. Chlorine: Cl, greenish-yellow poisonous gas. Cobalt: Co, silver-white metal. Gold: Au, heavy yellow metal. Helium: He, light gas with no color, taste, or odor. Hydrogen: H, gas with no color, taste, or odor. Iron: Fe, gray-white metal. Mercury: Hg, heavy silver-colored metal, liquid at room temperature. Nitrogen: N, gas with no color, taste, or odor. Oxygen: O, gas with no color, taste, or odor. Silver: Ag, shiny white metal. Sodium: Na, soft silvery metal. Sulfur: S, powdery yellow solid." },
        { type: 'image-group', images: [
          { src: '/images/science/ch05/common-elements-table.jpg', caption: 'Some common elements' }
        ] }
      ],
      [
        { type: 'heading', text: "Molecules and Compounds" },
        { type: 'p', text: "What happens when atoms combine? You have learned that the smallest particle of matter is the atom. Atoms do not usually exist alone on earth. They combine, sometimes in pairs, sometimes in threes. Sometimes hundreds of atoms combine. New substances form when atoms of different elements combine. These new substances are called compounds (kom'poundz). The simplest particle of many compounds is a molecule (mol'a kyul). Most molecules are made of two or more atoms." },
        { type: 'image-group', images: [
          { src: '/images/science/ch05/hydrogen-oxygen-gas.jpg', caption: 'Hydrogen gas and oxygen gas' },
          { src: '/images/science/ch05/oxygen-molecule-diagram.jpg', caption: 'Oxygen molecule' }
        ] },
        { type: 'p', text: "Sometimes two atoms of the same element combine to form a molecule. Two atoms of the element oxygen join to form a molecule of oxygen. In the same way, two atoms of the element hydrogen join to form a molecule of hydrogen. The oxygen and hydrogen molecules are not compounds — compounds are formed only when atoms of different elements join." },
      ],
      [
        { type: 'activity', text: "Can you form a compound? Materials: 2 test tubes / steel wool pad / magnet / water / 2 test-tube clamps / ring stand / 600-ml beaker / wax pencil / hand lens. Procedure: A. Test a steel wool pad with a magnet. 1. Is the steel wool attracted to the magnet? B. Wet the steel wool pad with water. Fill the lower 2 cm of a test tube with a piece of the steel wool pad. Use a pencil to push the pad into the tube. Use a wax pencil to make a mark 2 cm from the open end of each test tube. C. Half fill a beaker with water. Set up the two test tubes with the beaker and a ring stand. One test tube will be empty. Make sure the wax pencil mark is even with the surface of the water. 2. Predict what will happen in each test tube. D. Observe the test tubes for 5 days. Note any changes that occur each day. 3. How has the steel wool pad changed? 4. How has the water level changed? E. After 5 days remove the steel wool pad and look at it with a hand lens. Test it with a magnet. 5. Describe how the steel wool pad looks. 6. Is the steel wool attracted to the magnet? Conclusion: A new compound has been formed. It is called iron oxide, made from iron and oxygen. The oxygen came from the air. 1. Where did the iron come from? 2. Why do you think the water level changed? Using science ideas: There are many things around you that are made of iron. Name some ways that you can prevent iron objects from changing to iron oxide." },
        { type: 'image-group', images: [
          { src: '/images/science/ch05/compound-setup.jpg', caption: 'Setting up the compound experiment' },
          { src: '/images/science/ch05/compound-hand.jpg', caption: 'Adding steel wool to a test tube' }
        ] }
      ],
      [
        { type: 'p', text: "You have learned that the atoms in a compound are from different elements. Table salt, for example, is made of the elements sodium and chlorine. Sugar is another compound. It is made of atoms of the elements carbon, hydrogen, and oxygen. A compound may be very different from the atoms it is made of. Sugar is a white crystal that tastes sweet, yet it is formed of carbon, hydrogen, and oxygen. Are these three elements very different from sugar?" },
        { type: 'p', text: "A table of common compounds lists the elements each one is made of and describes those elements. The elements making up sugar are very different from the compound sugar itself." },
        { type: 'image-group', images: [
          { src: '/images/science/ch05/salt-pouring.jpg', caption: 'Salt and salt crystals' },
          { src: '/images/science/ch05/sugar-pouring.jpg', caption: 'Sugar and sugar crystals' }
        ] },
        { type: 'p', text: "Find the elements that make up table salt. Do the elements sodium and chlorine look like table salt? No. Sodium is a silvery metal. Chlorine is a greenish-yellow poisonous gas. Table salt is a white crystal used to season food. Notice that the compound salt is different from the elements that make it up." },
      ],
      [
        { type: 'heading', text: 'Four Common Compounds' },
        { type: 'activity', text: "Compound: description — elements and their descriptions. Table salt: salty-tasting white crystal used to season food — Sodium (Na): soft silvery metal; Chlorine (Cl): greenish-yellow poisonous gas. Water: liquid found over three fourths of the earth's surface — Hydrogen (H): gas with no color, taste, or odor; Oxygen (O): gas with no color, taste, or odor. Sugar: sweet-tasting white crystal used to sweeten food — Carbon (C): black solid found in coal, charcoal, and diamonds; Hydrogen (H): gas with no color, taste, or odor; Oxygen (O): gas with no color, taste, or odor. Ammonia: strong-smelling gas that dissolves in water — Nitrogen (N): gas with no color, taste, or odor; Hydrogen (H): gas with no color, taste, or odor." },
        { type: 'image-group', images: [
          { src: '/images/science/ch05/compounds-table.jpg', caption: 'Four common compounds' },
          { src: '/images/science/ch05/salt-crystals-enlarged.jpg', caption: 'Enlarged salt crystals' },
          { src: '/images/science/ch05/water-droplets.jpg', caption: 'Water droplets' },
          { src: '/images/science/ch05/sugar-crystals-enlarged.jpg', caption: 'Enlarged sugar crystals' },
          { src: '/images/science/ch05/ammonia-bottle.jpg', caption: 'Ammonia in water' }
        ] }
      ],
      [
        { type: 'image-group', images: [
          { src: '/images/science/ch05/water-recreation.jpg', caption: 'Water for recreation' }
        ] },
        { type: 'p', text: "Here is another example. Water is a compound formed from elements that are different from water. On the earth water can be found as a liquid, as a solid, and as a gas. We drink it and we bathe in it. It makes up about two thirds of our body." },
        { type: 'p', text: "Water is made up of the elements hydrogen and oxygen. Hydrogen is a gas that has no color, taste, or odor. Oxygen is also a gas. It, too, has no color, taste, or odor. It makes up about one fifth of the air. The elements that make up water are very different from the compound water." },
        { type: 'p', text: "Remember that scientists use symbols for the names of elements. It is easier to write the symbol for an element than to spell out its name. Scientists also use these symbols to write the names of compounds. Water is written H2O. H2O stands for one molecule of water. The symbol for hydrogen (H) is joined with the symbol for oxygen (O)." },
      ],
      [
        { type: 'sidebar', text: "The small number 2 after the H means there are two atoms of hydrogen in a molecule of water. Notice that there is no number after the O — this means there is only one atom of oxygen in a molecule of water. Do you know? The chemical symbols used by scientists today were not always used. Over the centuries the symbols for the elements have changed. In the sixteenth century the symbol for gold was a picture of the sun. The symbol for mercury was a staff carried by the god Mercury. Lead was represented by a farm tool carried by the god Saturn. In 1814 all this changed. A chemist in Sweden decided to use letter symbols for the elements, based on the ancient names of the elements. Au, used for gold, stands for aurum (or'em). Hg, used for mercury, stands for hydrargyrum (hi drdr'jer am). Pb, used for lead, stands for plumbum. These same letter symbols are still used today by chemists all over the world." },
      ],
      [
        { type: 'p', text: "H2O is the formula (for'mya la) for water. A formula is a group of symbols and numbers that stands for a compound. The symbols in a formula show the kinds of atoms in a compound. The numbers in a formula show the number of atoms in the smallest particle of a compound." },
        { type: 'p', text: "Every compound can be written with a formula. The formula for one type of sugar is C12H22O11. What does this formula show you? It shows you that one molecule of sugar contains atoms of carbon, hydrogen, and oxygen. It also shows you there are 12 atoms of carbon, 22 atoms of hydrogen, and 11 atoms of oxygen. You can see that a formula shows a lot about a compound." },
        { type: 'image-group', images: [
          { src: '/images/science/ch05/ocean-waves-molecule.jpg', caption: 'A water molecule' }
        ] }
      ],
      [
        { type: 'summary', text: "Matter is anything that has mass and takes up space." },
        { type: 'summary', text: "Indirect evidence gives clues that scientists use to make guesses about things they cannot see or test directly." },
        { type: 'summary', text: "An atom is the basic unit of all matter. An atom is the smallest particle of an element." },
        { type: 'summary', text: "The central part of an atom is the nucleus, which contains protons and neutrons. Electrons travel around the nucleus." },
        { type: 'summary', text: "An element is matter that is made up of only one kind of atom." },
        { type: 'summary', text: "A symbol is a short way to write the name of an element." },
        { type: 'summary', text: "A molecule is the simplest particle of many compounds." },
        { type: 'summary', text: "A compound is matter formed when two or more atoms of different elements are combined. Scientists use formulas to write the names of compounds." },
      ],
      [
        { type: 'review', title: 'Reviewing the Chapter', sections: [
          {
            heading: 'Science Words',
            instructions: 'Copy the sentences below. Use science terms from the chapter to complete the sentences.',
            items: [
              { prompt: "Scientists call a group of symbols and numbers that stands for a compound a/an ___.", answer: "formula" },
              { prompt: "The central part of the atom is called the ___.", answer: "nucleus" },
              { prompt: "Matter made of only one kind of atom is a/an ___.", answer: "element" },
              { prompt: "A measure of the amount of matter in an object is its ___.", answer: "mass" },
              { prompt: "A substance formed when atoms of different elements combine is a/an ___.", answer: "compound" },
              { prompt: "A tiny particle that travels around the nucleus of an atom is a/an ___.", answer: "electron" },
              { prompt: "Anything that has mass and takes up space is ___.", answer: "matter" },
              { prompt: "A set of clues that scientists use to make guesses about things they cannot see or test directly is ___.", answer: "indirect evidence" },
            ]
          },
          {
            heading: 'Science Words — Unscramble',
            instructions: "Unscramble each group of letters to find a science term from the chapter. Write a sentence using each term.",
            items: [
              { prompt: "ulelomec", answer: "molecule" },
              { prompt: "notrop", answer: "proton" },
              { prompt: "tiiuhnferb", answer: "neutron" },
              { prompt: "myblos", answer: "symbol" },
            ]
          },
          {
            heading: 'Science Words — Identify',
            instructions: "Identify each of the following.",
            items: [
              { prompt: "It is a very tiny particle. It is part of an atom. It travels around the nucleus. What is it?", answer: "electron" },
              { prompt: "It is made of numbers. It is made of symbols. It stands for a compound. What is it?", answer: "formula" },
            ]
          },
        ] }
      ],
      [
        { type: 'image-group', images: [
          { src: '/images/science/ch05/water-molecule-numbered.jpg', caption: 'A water molecule, with numbered parts' }
        ] },
        { type: 'review', title: 'Reviewing the Chapter', sections: [
          {
            heading: 'Understanding Ideas',
            items: [
              { prompt: "The drawing shows a water molecule. Write the correct term for each number in the drawing. What is the formula for this compound?", answer: "1 = hydrogen atom, 2 = oxygen atom, 3 = hydrogen atom. The formula for this compound is H2O." },
              { prompt: "Make a chart like the one shown below. Write the correct information in the empty boxes: Carbon → ___, Mercury → ___, ___ → Fe, ___ → Ag, Sodium → ___, ___ → Au.", answer: "Carbon → C, Mercury → Hg, Iron → Fe, Silver → Ag, Sodium → Na, Gold → Au." },
            ]
          },
          {
            heading: 'Using Ideas',
            items: [
              { prompt: "You can use indirect evidence to play a game. You will need at least four players. Collect objects from around your home or school. Put each object into a paper bag. Each player is given a bag and looks at the object. He or she gives clues to the other players about what is in the bag. The winner is the person whose object is guessed with the fewest clues.", answer: "That you can gather clues — weight, shape, sound, smell — to make a good guess about something you cannot see directly, the same method scientists use to study atoms and other things too small or too far away to observe directly." },
            ]
          },
        ] }
      ],
    ]
  },
  "Ch.06 · Physical Changes in Matter": {
    title: "Physical Changes in Matter",
    pages: [
      [
        { type: 'heading', text: 'Chapter 6 · Physical Changes in Matter' },
        { type: 'p', text: "Matter changes in different ways. Do you know what the objects stacked around the flower were? They were cars. The cars were changed to solid cubes when they were crushed, or compacted, into this shape." },
        { type: 'p', text: "In what ways has the matter that makes up the cars changed? What has happened to the metal body and glass windows of the cars? The metal and glass have changed shape. They have also changed in size. These are two ways in which matter can change." },
        { type: 'p', text: "In this chapter you will learn about some of the ways in which matter can change. You will also learn how matter can be identified." },
        { type: 'image-group', images: [
          { src: '/images/science/ch06/crushed-cars.jpg', caption: 'Cars crushed into solid cubes of metal and glass' }
        ] }
      ],
      [
        { type: 'heading', text: 'Physical Properties' },
        { type: 'p', text: "What are physical properties of matter? The children in the picture are playing a game. The girl is blindfolded and then asked to smell two different kinds of food. She must identify which is a piece of onion and which is a piece of orange. The girl is using odor as a way of identifying matter." },
        { type: 'p', text: "These pictures show two elements — gold and carbon. How can you tell the piece of gold from the piece of carbon? One way to tell is by observing how each one looks. The color of gold is different from the color of carbon. Based on color, which piece is gold and which is carbon?" },
        { type: 'p', text: "Odor and color are physical properties of matter. A physical property is one that can be used to identify matter. Two other physical properties are shape and hardness." },
        { type: 'image-group', images: [
          { src: '/images/science/ch06/smell-test-game.jpg', caption: 'Identifying food by smell alone' },
          { src: '/images/science/ch06/gold-and-carbon.jpg', caption: 'Gold and carbon, identified by color' }
        ] }
      ],
      [
        { type: 'p', text: "Density is also a physical property of matter. It is the mass in a certain volume of matter. For example, a piece of wood has a certain volume. Its mass is 8 g. A piece of iron has the same volume as the wood, but its mass is 136 g. So the density of the iron is greater than the density of the wood. How many times greater?" },
        { type: 'p', text: "You can use the property of density to help you identify matter. In the pictures below, the glasses labeled A and B each contain a colorless liquid. One liquid is water and the other is alcohol. Water has a greater density than alcohol. An ice cube has been put into each liquid — the ice floats in the denser liquid and sinks in the less dense liquid. Which glass contains alcohol, A or B? How do you know?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch06/wood-vs-iron-mass.jpg', caption: 'Equal volumes of wood and iron with different mass' },
          { src: '/images/science/ch06/glasses-before-ice.jpg', caption: 'Glasses A and B, before an ice cube is added' },
          { src: '/images/science/ch06/glasses-after-ice.jpg', caption: 'The ice cube floats in one liquid and sinks in the other' }
        ] }
      ],
      [
        { type: 'heading', text: 'Physical Changes' },
        { type: 'p', text: "What kinds of physical changes can occur in matter? Matter can change in different ways. The pictures show a glass cup before and after it was dropped. Breaking the glass cup changes its size and shape. This kind of change is a physical change. A physical change is a change in the size, shape, or state of matter. New materials are not formed when there is a physical change. The same kind of matter is present both before and after a physical change. The pieces of the cup are no longer in the shape of a cup, but you can see that the pieces are still glass." },
        { type: 'p', text: "Changes in size and shape are common physical changes. When you write with chalk, tiny bits of chalk are rubbed from the stick of chalk onto the chalkboard. However, the bits of chalk are still chalk. The atoms and molecules in the chalk are not changed — they have simply been spread out across the chalkboard." },
        { type: 'image-group', images: [
          { src: '/images/science/ch06/glass-cup-before.jpg', caption: 'A glass cup before it was dropped' },
          { src: '/images/science/ch06/glass-cup-after.jpg', caption: 'The same glass cup after it broke' },
          { src: '/images/science/ch06/writing-with-chalk.jpg', caption: 'Writing with chalk on a chalkboard' }
        ] }
      ],
      [
        { type: 'p', text: "In each case, a physical change has taken place. The size and shape of matter have been changed, but the atoms and molecules in the matter have not been changed. The same kind of matter is present before and after each change." },
        { type: 'p', text: "Matter can exist in three forms, or states. The three states of matter are solid, liquid, and gas. Many kinds of matter can change from one state to another. A change in state is another kind of physical change." },
        { type: 'p', text: "Water is one of the few kinds of matter that commonly exists in all three states. Rain is liquid water. Ice cubes and icebergs are solid water. Water as a gas is invisible — it is called water vapor. Although you cannot see it, there is always water vapor in the air." },
        { type: 'image-group', images: [
          { src: '/images/science/ch06/iceberg-water-states.jpg', caption: 'Water as rain, as an iceberg, and as vapor in the air' }
        ] }
      ],
      [
        { type: 'p', text: "How do the three states of matter differ? Remember that all matter is made of tiny particles. Different states of matter differ in how far apart these particles are. There is an attraction between the particles in matter, and the strength of this attraction varies with the amount of space between particles. Also, the way in which particles in each state of matter move is different." },
        { type: 'p', text: "Particles in solid matter are packed very close together. This causes the attraction between these particles to be strong. The particles move back and forth in a very small space. Because the particles have a strong attraction for each other, they do not move around very much. For this reason, solids have a definite shape, and it is also why solids have a definite volume. A cube of sugar and a brick are solids. What are some other solids?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch06/three-states-of-matter-diagram.jpg', caption: 'How particles are arranged in a solid, a liquid, and a gas' }
        ] }
      ],
      [
        { type: 'p', text: "Particles in liquid matter are not as close together as those in a solid, so the attraction between particles in a liquid is weaker than in a solid. The weaker attraction allows particles in a liquid to slip and slide over and around one another. Because of the way the particles move, liquids have no definite shape — liquids take the shape of the container they are in. As the particles in liquids move, the spaces between them do not change, so liquids have a definite volume." },
        { type: 'p', text: "The picture shows containers of different sizes and shapes, each holding the same volume of water. What property of liquids does this show?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch06/containers-same-volume.jpg', caption: 'Containers of different shapes holding the same volume of water' }
        ] },
        { type: 'p', text: "Particles in gases are spread farther apart than the particles in liquids, so the attraction between them is very weak. This very weak attraction allows particles in a gas to move freely. Because the attraction is so weak and the spaces so great, gases have no definite shape or volume. Suppose a gas is put in a closed box or jar — the particles of the gas will spread out until they fill the box or jar." },
      ],
      [
        { type: 'p', text: "Changes in state are common physical changes. Energy is involved when matter changes from one state to another. Energy must be added to change a solid to a liquid, and energy must also be added to change a liquid to a gas. The energy that is added is usually in the form of heat. Heat energy causes the particles in solids and liquids to move faster. This increases the spaces between the particles and weakens the attraction, so a solid changes to a liquid and a liquid to a gas." },
        { type: 'p', text: "A glass of ice cubes left out on a hot summer day will melt. Melting is the change of state from a solid to a liquid. When heat is added to a solid, what happens to the particles in the solid? How does this explain why the solid melts? The temperature at which a solid changes to a liquid is called the melting point." },
        { type: 'p', text: "Cooking food often involves boiling liquids. When something boils, it changes from a liquid to a gas. As heat energy is added, some particles in the liquid have enough energy to escape from the liquid — the escaped particles are now particles in a gas. The temperature at which a liquid changes to a gas is called the boiling point." },
        { type: 'image-group', images: [
          { src: '/images/science/ch06/melting-ice.jpg', caption: 'Ice cubes melting on a hot day' },
          { src: '/images/science/ch06/boiling-water.jpg', caption: 'Water boiling as it cooks' }
        ] },
        { type: 'activity', text: "Finding out: How fast and how far can particles in a gas move? Get a bottle of perfume and some absorbent cotton. Have a partner stand about 5 m away. Have your partner open the bottle of perfume and pour a small amount of it onto the cotton — note the time. When you can smell the perfume, note the time again. How long did it take for you to smell the perfume? How far did the perfume particles travel to reach you? What conditions in the room might have affected how quickly the perfume particles reached you?" },
      ],
      [
        { type: 'p', text: "Most substances have a definite melting point and boiling point. Melting point and boiling point are physical properties of matter. The melting point of water is 0°C. Its boiling point is 100°C." },
        { type: 'p', text: "Some changes of state involve taking energy away. To change a gas to a liquid or a liquid to a solid, energy must be removed. The energy that is removed is usually heat energy. When heat energy is removed, the particles in matter move more slowly, so the spaces between the particles become smaller. What happens to the attraction between particles? How does this cause a liquid to change to a solid? How is liquid orange juice changed to a solid?" },
        { type: 'p', text: "Melting, boiling, and other changes in state may not seem like physical changes, but they are. Molecules in liquid water are not changed when the water changes to a gas or a solid. Liquid iron is made up of the same kinds of atoms that make up solid iron. Physical changes do not change the particles that make up matter." },
        { type: 'image-group', images: [
          { src: '/images/science/ch06/liquid-orange-juice.jpg', caption: 'Orange juice as a liquid' },
          { src: '/images/science/ch06/solid-orange-juice.jpg', caption: 'Orange juice frozen solid' },
          { src: '/images/science/ch06/liquid-iron.jpg', caption: 'Liquid iron' },
          { src: '/images/science/ch06/solid-iron.jpg', caption: 'Solid iron' }
        ] }
      ],
      [
        { type: 'heading', text: 'Mixtures' },
        { type: 'p', text: "What are the properties of a mixture? The children in the picture below are making a salad. They are mixing some lettuce, carrots, green peppers, and other vegetables. A salad is a mixture (miks'cher) of different vegetables. A mixture is a material formed by the physical combining of two or more different materials. Mixed nuts are another example of a mixture." },
        { type: 'p', text: "The materials in a mixture are not combined as they are in a compound. In a compound, substances have combined to form a new substance. But the materials that are in a mixture do not change to something else — lettuce remains lettuce when it is mixed with carrots. The materials in a mixture can be physically separated. How could you separate the pieces of vegetable in the salad mixture?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch06/kids-making-salad.jpg', caption: 'Children mixing a salad' },
          { src: '/images/science/ch06/mixture-of-nuts.jpg', caption: 'Mixed nuts, another example of a mixture' }
        ] }
      ],
      [
        { type: 'activity', text: "How can substances in a mixture be separated? Materials: spoon / table salt / sand / dark-colored paper / hand lens / 2 jars / filter paper / funnel / paper towel / glass or plastic dish. Procedure: A. Put a spoonful of table salt and a spoonful of sand on a sheet of dark paper. Use a hand lens to look at the sand and the salt, and draw some particles of each. 1. How are the particles different? B. Mix the sand and the salt together. Put water into a jar so the jar is half full. Add the salt-sand mixture to the water in the jar and stir with the spoon. 2. What happens? C. Fold a piece of filter paper and put it into a clean funnel. Put the funnel in another jar so it rests on the mouth of the jar. D. Slowly pour all the salt-sand-water mixture into the funnel. Take the filter paper out, open it, and place it on a paper towel, then allow the material on the filter paper to dry. E. Pour a small amount of the liquid from the jar into a dish and allow it to evaporate. 3. What material do you think will be left in the dish after the water evaporates? F. Use a hand lens to look at the dried materials on the filter paper and in the dish. 4. What material is left on the filter paper? 5. What material is left in the dish? Conclusion: 1. When you made the salt-sand-water mixture, what kind of change in matter occurred? 2. Describe how the materials in the mixture were separated." },
        { type: 'image-group', images: [
          { src: '/images/science/ch06/filter-paper-folding.jpg', caption: 'Folding filter paper for the activity' },
          { src: '/images/science/ch06/activity-pouring-mixture.jpg', caption: 'Pouring the salt-sand-water mixture through the funnel' }
        ] }
      ],
      [
        { type: 'p', text: "The pieces or particles in a mixture can be of different sizes. The pieces of vegetable in the salad are large. Suppose you mix sand and salt together — the particles are small, but they can be seen, and they can also be separated from each other by physical means." },
        { type: 'p', text: "Mixtures are found everywhere. Almost all foods are mixtures. Nearly all the water on the earth is a mixture too — if you have ever tasted ocean water, you know it is salty. Ocean water is a mixture of water and different kinds of salts." },
        { type: 'sidebar', text: "Do you know? One special type of mixture is called an alloy (al'oi). Most alloys are mixtures of two or more metals, and they are usually harder and stronger than each of the metals they are made from. For example, when iron is mixed with carbon and certain other elements, steel is formed. Steel is stronger and better able to resist rust than iron alone. Some scientists think that alloys can be made cheaper and better in space. They are testing this idea by making certain alloys during missions of the Space Shuttle. Some day most of the alloys we use on the earth may be made in factories in space." },
        { type: 'image-group', images: [
          { src: '/images/science/ch06/household-mixtures.jpg', caption: 'Everyday mixtures found around the home' },
          { src: '/images/science/ch06/space-shuttle-alloys.jpg', caption: 'Testing alloys aboard the Space Shuttle' }
        ] }
      ],
      [
        { type: 'heading', text: 'Two Kinds of Mixtures' },
        { type: 'p', text: "How are a solution and a suspension different? You have learned that the particles in some mixtures are large enough to be seen — you can see the grains that make up a mixture of sand and salt. In other mixtures the particles that are mixed together are individual molecules. You cannot see the particles in a mixture of sugar and water — the particles of sugar and water are individual molecules." },
        { type: 'p', text: "A mixture of sugar and water is a special kind of mixture called a solution (sa lu'shen). A solution is a mixture that forms when one substance dissolves in another. In a solution the particles of the substances are evenly mixed. Most solutions are a solid dissolved in a liquid, and these solutions are clear, even if they are colored." },
        { type: 'p', text: "What happens when sugar mixes with water? The sugar particles seem to disappear in the water. Of course the sugar has not disappeared — it has dissolved in the water. This means that the sugar molecules are evenly mixed with the water molecules. You cannot see the tiny sugar molecules, but if the water evaporates, the sugar molecules form solid sugar again." },
        { type: 'image-group', images: [
          { src: '/images/science/ch06/sugar-dissolving-in-water.jpg', caption: 'Sugar dissolving in water' }
        ] }
      ],
      [
        { type: 'p', text: "A solution has two parts. The solute (sol'yut) is the substance in a solution that dissolves — in a sugar-and-water solution, sugar is the solute. Water is the solvent. The solvent (sol'vent) is the substance in a solution that does the dissolving." },
        { type: 'image-group', images: [
          { src: '/images/science/ch06/sugar-water-solution-diagram.jpg', caption: 'How sugar molecules mix evenly with water molecules' }
        ] },
        { type: 'p', text: "Several things affect how fast a solute dissolves in a solvent. Stirring makes a solute dissolve faster. Temperature also affects how fast a solute dissolves — most solutes dissolve faster in a warm solvent than in a cold one. The picture shows powdered tea in hot water and in cold water. The same amount of tea was put into each glass at the same time. Why is there a difference in the amount of tea dissolved in each glass?" },
        { type: 'p', text: "The size of the solute particles also affects how fast the solute dissolves. Small solute particles dissolve faster than large solute particles — for example, small grains of sugar will dissolve faster than a whole sugar cube." },
        { type: 'image-group', images: [
          { src: '/images/science/ch06/tea-hot-vs-cold.jpg', caption: 'Powdered tea dissolving in hot water and in cold water' }
        ] }
      ],
      [
        { type: 'activity', text: "How does the size of solute particles affect how fast a solute dissolves? Materials: 2 jars / 2 sugar cubes / paper / plastic bag. Procedure: A. Half fill two jars with warm water. B. Wrap a sugar cube in a piece of paper, put the wrapped cube into a plastic bag, and crush the sugar cube into a powder by stepping on the bag. C. Pour all of the crushed sugar into one of the jars of water. Quickly drop a whole sugar cube into the other jar of water. 1. Which do you think will dissolve first, the sugar cube or the crushed sugar? D. Watch each jar and note in which one the sugar dissolves first. 2. Which dissolves first, the sugar cube or the crushed sugar? 3. How is the size of the solute particles different in each jar? Conclusion: How does the size of the solute particles affect how fast a solute dissolves? Using science ideas: Repeat steps A through D, but put hot water in one jar and cold water in the other, with the whole sugar cube in the hot water and the crushed sugar cube in the cold water. Does this affect whether the cube or the crushed sugar dissolves first? Explain the results." },
      ],
      [
        { type: 'p', text: "The picture on the left shows what happens when crushed chalk is mixed with water. You can see that the water becomes very cloudy, but the chalk and water do not form a solution. The particles of chalk do not dissolve in the water — the chalk particles float in the water. The mixture of chalk and water is called a suspension (sa spen'shen). A suspension is a mixture in which particles of a substance do not dissolve in another substance. Suspensions are cloudy mixtures." },
        { type: 'p', text: "In the chalk-and-water mixture, the chalk particles are suspended in the water. If they are not disturbed, the particles in a suspension will separate from the liquid and settle to the bottom. A photo of the chalk-and-water mixture after 2 days shows the chalk particles settled to the bottom." },
        { type: 'image-group', images: [
          { src: '/images/science/ch06/suspension-chalk-water.jpg', caption: 'A suspension of chalk and water' },
          { src: '/images/science/ch06/settled-chalk-particles.jpg', caption: 'Settled chalk particles after 2 days' }
        ] },
        { type: 'p', text: "You may have seen bottles labeled \"Shake well before using.\" Many such bottles contain some kind of suspension. A vinegar-and-oil salad dressing is a suspension. Orange juice and some liquid medicines are also suspensions." },
      ],
      [
        { type: 'heading', text: 'Another Kind of Change' },
        { type: 'p', text: "What is a chemical change? You have learned about many different physical changes in matter, but matter can change in another way. When a piece of wood burns, it changes into new substances. Burning wood is an example of a chemical change. A chemical change is a change in matter in which one or more different kinds of matter form." },
        { type: 'p', text: "The physical properties of matter change when there is a chemical change. Iron is a dark-gray metal that is attracted by a magnet. Sulfur is a yellow powder that is not attracted by a magnet. When iron and sulfur are mixed together, they can easily be separated, and neither substance has changed. But when iron and sulfur are heated together, a chemical change takes place — a new substance is formed. This substance is iron sulfide. It is brown-black in color, and it is not attracted to a magnet." },
        { type: 'image-group', images: [
          { src: '/images/science/ch06/iron-sample-magnet.jpg', caption: 'Iron — attracted by a magnet' },
          { src: '/images/science/ch06/sulfur-sample-magnet.jpg', caption: 'Sulfur — not attracted by a magnet' },
          { src: '/images/science/ch06/iron-and-sulfur-mixed.jpg', caption: 'Iron and sulfur mixed' },
          { src: '/images/science/ch06/iron-sulfide-formed.jpg', caption: 'Iron sulfide' }
        ] },
      ],
      [
        { type: 'p', text: "Some chemical changes take place slowly. The rust on the body of an old car formed from a slow chemical change — oxygen from the air joined with iron to form the compound iron oxide, commonly called rust. How does paint help stop rust from forming?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch06/rusting-car.jpg', caption: 'Rusting — a slow chemical change' }
        ] },
        { type: 'p', text: "Other chemical changes take place more quickly. When vinegar is poured on baking soda, a rapid chemical change takes place, and new substances are formed. One new substance is carbon dioxide gas." },
        { type: 'image-group', images: [
          { src: '/images/science/ch06/vinegar-baking-soda-reaction.jpg', caption: 'A rapid chemical change — vinegar poured on baking soda' }
        ] },
      ],
      [
        { type: 'summary', text: "A physical property is one that can be used to identify matter. Color, odor, shape, hardness, and density are physical properties." },
        { type: 'summary', text: "A physical change is a change in the size, shape, or state of matter." },
        { type: 'summary', text: "The three states of matter — solid, liquid, and gas — differ in how particles move, in how far apart particles are, and in the strength of attraction between particles." },
        { type: 'summary', text: "Melting point and boiling point are physical properties." },
        { type: 'summary', text: "A mixture is a material formed by the physical combining of two or more different materials." },
        { type: 'summary', text: "A solution is a mixture that forms when one substance dissolves in another. A suspension is a mixture in which particles of a substance do not dissolve in another substance." },
        { type: 'summary', text: "A chemical change is a change in matter in which one or more different kinds of matter form." },
      ],
      [
        { type: 'review', title: 'Reviewing the Chapter', sections: [
          {
            heading: 'Science Words',
            instructions: 'Copy the sentences below. Use science terms from the chapter to complete the sentences.',
            items: [
              { prompt: "The temperature at which a solid changes to a liquid is the ___.", answer: "melting point" },
              { prompt: "The same kind of matter is present both before and after a ___ in matter.", answer: "physical change" },
              { prompt: "Density is a ___ that can be used to identify matter.", answer: "physical property" },
              { prompt: "A substance changes from a liquid to a gas when that substance reaches its ___.", answer: "boiling point" },
              { prompt: "When iron and sulfur are heated together, a ___ takes place and a new substance is formed.", answer: "chemical change" },
            ]
          },
          {
            heading: 'Science Words — Matching',
            instructions: 'Write the letter of the term that best matches the definition. Not all the terms will be used. (a. solute, b. particle, c. mixture, d. solution, e. liquid, f. suspension, g. solvent)',
            items: [
              { prompt: "Mixture in which particles of a substance do not dissolve in another substance", answer: "suspension" },
              { prompt: "Substance in a solution that dissolves", answer: "solute" },
              { prompt: "Mixture that forms when one substance dissolves in another", answer: "solution" },
              { prompt: "Substance in a solution that does the dissolving", answer: "solvent" },
              { prompt: "Material formed by the physical combining of two or more different materials", answer: "mixture" },
            ]
          },
        ] }
      ],
      [
        { type: 'review', title: 'Reviewing the Chapter', sections: [
          {
            heading: 'Understanding Ideas',
            instructions: "A. Write whether each situation describes a physical change or a chemical change, and describe each change.",
            items: [
              { prompt: "Crushing a car into a solid cube of metal and glass.", answer: "A physical change — the metal and glass only change size and shape; they're still the same matter." },
              { prompt: "Heating iron and sulfur together until a new brown-black substance, iron sulfide, forms.", answer: "A chemical change — a brand-new substance, iron sulfide, forms that is neither iron nor sulfur." },
            ]
          },
          {
            heading: 'Understanding Ideas — B',
            instructions: "Identify each of the following as matter that is solid, liquid, or gas.",
            items: [
              { prompt: "It is the state of matter in which particles slip and slide over and around one another. Matter in this state has no definite shape, but it does have a definite volume.", answer: "liquid" },
              { prompt: "It is the state of matter in which particles move freely and are spread far apart. Matter in this state has no definite shape or volume.", answer: "gas" },
              { prompt: "It is the state of matter in which particles move back and forth in a very small space. Matter in this state has a definite shape and a definite volume.", answer: "solid" },
            ]
          },
          {
            heading: 'Using Ideas',
            items: [
              { prompt: "For a 1-week period, identify all the physical changes that occur in your home.", answer: "Look for changes in size, shape, or state where the matter stays the same substance throughout — for example, ice melting in a drink, butter softening, paper being torn, or water boiling for tea." },
            ]
          },
        ] }
      ],
    ]
  },
  "Ch.07 · Understanding Electricity": {
    title: "Understanding Electricity",
    pages: [
      [
        { type: 'heading', text: 'Chapter 7 · Understanding Electricity' },
        { type: 'p', text: "You live in a world that depends on electricity. Look around. You may have many things in your home that run on electricity. A television, a stereo, and a radio use electricity. The lights in your house, the clock on the wall, and the toaster in the kitchen all need electricity. You may have toys and games that run on electricity. Your home may be heated by electricity. Your food may be cooked in an electric oven." },
        { type: 'p', text: "The boy in the picture is looking at the many electrical devices on display. Can you imagine your life without electricity?" },
        { type: 'p', text: "In this chapter you will learn what electricity is. You will learn how it is produced, used, and measured. You will also learn about some of the dangers of electricity and how it can be used safely." },
        { type: 'image-group', images: [
          { src: '/images/science/ch07/electrical-appliances-shelf.jpg', caption: 'A boy looking at electrical devices on display' }
        ] }
      ],
      [
        { type: 'heading', text: 'What Is Electricity?' },
        { type: 'p', text: "You depend a great deal on electricity. But what is electricity? You cannot see it. You can only see what it does. For a long time scientists have been interested in what electricity is and does." },
        { type: 'p', text: "What is known about electricity? Scientists know that everything is either matter or energy. Matter has mass and takes up space. Since electricity does not have mass or take up space, it must be energy." },
        { type: 'image-group', images: [
          { src: '/images/science/ch07/electric-train-bart-new.jpg', caption: 'Train running on electricity' }
        ] },
        { type: 'p', text: "You know that electricity can do work. What kind of work is being done in the picture?" }
      ],
      [
        { type: 'image-group', images: [
          { src: '/images/science/ch07/neutral-atom-diagram.jpg', caption: 'A neutral atom, with a balanced number of electrons and protons' }
        ] },
        { type: 'p', text: "To understand electrical energy, you must understand matter. Remember that all matter is made of atoms. Knowing the structure of the atom will help solve the mystery of electricity. You have learned that the atom has a central part called a nucleus. There are particles in the nucleus. Some of these particles have a positive charge. They are called protons. Moving around the nucleus are other particles, called electrons. The electrons in an atom have a negative charge. If the number of protons and the number of electrons in an atom are the same, their charges balance one another. When this happens, the atom has no charge. An atom with no charge is neutral. Under normal conditions the atoms in most matter are neutral. As the drawing shows, the number of electrons and protons is balanced." },
        { type: 'image-group', images: [
          { src: '/images/science/ch07/tug-of-war-electrons-analogy.jpg', caption: 'Children playing tug-of-war, with unbalanced teams' }
        ] },
        { type: 'p', text: "Look at the drawing of the children playing tug-of-war. You can see that the teams are not balanced. One team has six children and the other has four. To balance the teams, some children will have to move. They can move in only one direction. Some children will have to move from the side with the larger number to the side with the smaller number. How many children will have to move to balance the teams?" }
      ],
      [
        { type: 'p', text: "In some ways electricity is like this game of tug-of-war. Suppose the number of protons and the number of electrons in an atom are not the same. This happens when an atom gains or loses electrons. If an atom has more electrons than protons, the atom has a negative charge. An atom with more protons than electrons has a positive charge." },
        { type: 'p', text: "Look at the drawings of the atoms. As you can see, atoms can gain or lose electrons. Atom A is losing an electron. Atom B is gaining an electron. This movement of electrons produces electricity. Which atom has a positive charge? Which atom has a negative charge?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch07/atoms-gaining-losing-electron.jpg', caption: 'Atom A losing an electron, atom B gaining an electron' }
        ] },
        { type: 'activity', text: "Finding out: Does clear tape have an electric charge? You will need a roll of clear tape. Remove two strips of tape from the roll. Each strip should be about 8 cm long. Make sure that you touch only one end of the tape. Slowly move the two sticky sides of the tape toward each other. Then slowly move the two smooth sides toward each other. Watch what happens. Do the pieces of tape have an electric charge? How can you tell?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch07/tape-static-charge-test.jpg', caption: 'Testing whether strips of tape have an electric charge' }
        ] }
      ],
      [
        { type: 'heading', text: 'Kinds of Electricity' },
        { type: 'p', text: "It is a cold, dry day in winter. You walk across a wool carpet and reach out to turn a doorknob. You feel a shock. What happened? When you moved across the carpet, you gained electrons. Your shoes rubbed electrons off the carpet. The electrons built up on your body and stayed there. This buildup of electrons gave your body an electric charge. An electric charge that does not move is called {{static electricity}}." },
        { type: 'image-group', images: [
          { src: '/images/science/ch07/electric-discharge-diagram.jpg', caption: 'Electric discharge — a collection of electrons jumping from a doorknob to a hand' },
          { src: '/images/science/ch07/boy-touching-doorknob.jpg', caption: 'Feeling a shock after touching a doorknob' }
        ] }
      ],
      [
        { type: 'p', text: "When you touched the doorknob, electrons moved from you to the doorknob. Why did this happen? Electrons move from a place where there are many electrons to a place where there are fewer electrons. Your body had more electrons than the doorknob. When you touched the doorknob, the extra electrons moved from your body to the doorknob. This movement of the extra electrons is called an {{electric discharge}}. After the electric discharge, you became neutral again." },
        { type: 'p', text: "Lightning is another example of a discharge of static electricity. Lightning is often caused by a buildup of electrons on a cloud. The cloud has more electrons than the ground. When the difference between the charge on the cloud and the charge on the ground is great enough, an electric discharge occurs. You can see this discharge as lightning." },
        { type: 'image-group', images: [
          { src: '/images/science/ch07/lightning-electric-discharge.jpg', caption: 'Electric discharge (lightning)' },
          { src: '/images/science/ch07/why-lightning-strikes-diagram.jpg', caption: 'Why lightning strikes: electron buildup on a cloud' }
        ] },
        { type: 'p', text: "Electrons move when they jump from a finger to a doorknob. They also move when lightning strikes the earth. This movement of electrons is called {{current electricity}}. Current electricity is more useful than static electricity. What are some ways that current electricity is used?" }
      ],
      [
        { type: 'sidebar', text: "Do you know? The first person to prove that lightning is a form of electricity was Benjamin Franklin. He did this by flying a silk kite during a thunderstorm. He attached a metal wire to the kite string near the top of the kite. He then tied a metal key to the lower end of the string. Electrons from the clouds collected on the wire. They then flowed down the string to the key. When Franklin touched the key, he felt a small shock. The electrons had jumped onto his fingers. Franklin concluded that the electricity he felt came from the clouds. If lightning had struck the kite, he would have died from a powerful shock." },
        { type: 'image-group', images: [
          { src: '/images/science/ch07/franklin-kite-experiment.jpg', caption: 'Benjamin Franklin\'s kite experiment' }
        ] },
        { type: 'p', text: "The electricity that jumped to the doorknob had to move through some form of matter. It moved through air. Electricity can move through other forms of matter, such as metal. Matter through which an electric current moves easily is called a {{conductor}}. Most metals are good conductors. Some metals are better conductors than others. Gold, silver, and copper are all good conductors. Copper is low-priced and easy to obtain. So it is often used as a conductor." },
        { type: 'p', text: "Not all kinds of matter are good conductors. Current cannot move easily through wood, rubber, glass, or plastic. Matter that is not a good conductor is called an {{insulator}}. Rubber is often used as an insulator around copper wire. The rubber helps to keep electricity in the wire. An insulator helps to prevent electric shock." },
        { type: 'image-group', images: [
          { src: '/images/science/ch07/insulated-wire-types.jpg', caption: 'Types of insulated wire: rubber, plastic, and rubber/cloth/paper/metal insulation' }
        ] }
      ],
      [
        { type: 'heading', text: 'Which Materials Are Conductors?' },
        { type: 'activity', text: "Materials: 6-volt battery / light bulb and socket / 3 test leads / copper penny / cardboard strip / toothpick / aluminum foil / paper clip / rubber band. Procedure: A. You are going to test different materials to see if they are conductors or insulators. Make a chart like the one shown below, listing copper penny, toothpick, cardboard strip, aluminum foil, paper clip, and rubber band, with columns for Conductor and Insulator. B. Connect the battery, test leads, and light bulb as shown. C. Remove one of the test leads from the bulb. Clip it to a copper penny. Use another test lead to clip the penny to the bulb as shown. 1. What happens to the bulb? 2. Is the penny a conductor or an insulator? D. Repeat step C for each of the other materials. Fill in your chart. Conclusion: 1. Which materials are conductors of electricity? 2. How are all the conductors alike? 3. Which materials are insulators? How do you know? Using science ideas: Look around your home for tools that are used to repair electric devices. The handles of some of the tools will be covered with rubber. Explain why." },
        { type: 'image-group', images: [
          { src: '/images/science/ch07/activity-conductor-test-1.jpg', caption: 'Connecting the battery, test leads, and light bulb' },
          { src: '/images/science/ch07/activity-conductor-test-2.jpg', caption: 'Testing whether a penny conducts electricity' }
        ] }
      ],
      [
        { type: 'heading', text: 'Electric Circuits' },
        { type: 'p', text: "Electricity must flow through a path to be useful. The path through which an electric current flows is a {{circuit}}. A circuit lets electrons flow from a place where there are many electrons to a place where there are few. The flow of electrons in a circuit is similar to the flow of water in a pipe. Like water, electrons need a path to follow. The pipe gives water a path to follow. The circuit gives electrons a path to follow. The drawing shows a light bulb in an electric circuit. Electricity flowing through the wire lights the bulb." },
        { type: 'p', text: "An electric circuit must be complete for electricity to flow through it. A circuit that is complete is called a closed circuit. If there is a break in the circuit, electricity will not flow through it. A circuit that is broken, or incomplete, is called an open circuit. The opening and closing of a circuit is controlled by a device called a switch." },
        { type: 'image-group', images: [
          { src: '/images/science/ch07/electric-circuit-dry-cell.jpg', caption: 'An electric circuit, showing the flow of electrons from a dry cell' },
          { src: '/images/science/ch07/open-vs-closed-circuit.jpg', caption: 'An open circuit and a closed circuit' }
        ] }
      ],
      [
        { type: 'image-group', images: [
          { src: '/images/science/ch07/series-circuit-two-bulbs.jpg', caption: 'A series circuit with two light bulbs' }
        ] },
        { type: 'p', text: "There are two kinds of electric circuits. One kind is a {{series circuit}}. A series circuit is one in which current can follow only one path. An open switch or a broken wire stops the flow of current in a series circuit. The drawing shows a simple series circuit. It has an energy source, a copper wire, a switch, and two light bulbs. What happens to the flow of current when the switch is open? What happens when the switch is closed? Suppose one more light bulb is added to the circuit. The current must flow through it also. If one of the bulbs burns out, the path is broken. The current no longer has a path to move through." }
      ],
      [
        { type: 'image-group', images: [
          { src: '/images/science/ch07/parallel-circuit-two-bulbs.jpg', caption: 'A parallel circuit with two light bulbs' }
        ] },
        { type: 'p', text: "The other kind of electric circuit is a {{parallel circuit}}. A parallel circuit is one in which current can follow more than one path. Look at the parallel circuit with two bulbs shown in the drawing. The current does not have to flow through the green bulb to reach the red bulb. Compare it with the drawing of the series circuit. How many paths can you trace in the parallel circuit?" },
        { type: 'p', text: "Most circuits used in homes are parallel circuits. If you turn off one light in your home, the other lights will stay on. The parallel circuit provides another path for the current to follow. It is like taking a detour on a road. Traffic can flow from one point to another, but it goes along a different route. What would happen if the lights in your home were not wired in a parallel circuit?" }
      ],
      [
        { type: 'heading', text: 'Are Bulbs Brighter in a Series Circuit or a Parallel Circuit?' },
        { type: 'activity', text: "Materials: 6-volt battery / 2 light bulbs and sockets / 5 test leads / insulated copper wire. Procedure: A. Connect one light bulb in a circuit, as shown in the top picture. 1. Observe the brightness of the bulb. 2. What would happen if you added one more bulb? B. Add one more bulb to the circuit, as shown in the middle picture. You have connected the bulbs in a series circuit. Observe the brightness of the two bulbs. 3. Are the two bulbs brighter than the one bulb? 4. Why is there a difference? C. Connect two bulbs in the circuit, as shown in the bottom picture. This is a parallel circuit. Observe the brightness of the bulbs. 5. Are the bulbs as bright as the bulbs in step B? 6. Are the bulbs as bright as the bulb in step A? Conclusion: 1. Which circuit has the brighter bulbs? 2. Explain in your own words the difference between a series circuit and a parallel circuit. Using science ideas: 1. Draw a series circuit that has five bulbs. Suppose one bulb burned out. What would happen to the other bulbs? 2. Draw a parallel circuit that has five bulbs. Suppose one bulb burned out. What would happen to the other bulbs?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch07/activity-brightness-panel-1.jpg', caption: 'Step A — one bulb connected in a circuit' },
          { src: '/images/science/ch07/activity-brightness-panel-2.jpg', caption: 'Step B — two bulbs in a series circuit' },
          { src: '/images/science/ch07/activity-brightness-panel-3.jpg', caption: 'Step C — two bulbs in a parallel circuit' }
        ] }
      ],
      [
        { type: 'heading', text: 'Producing Electricity' },
        { type: 'p', text: "Have you ever used a magnet to pick up pins or paper clips? Did you know that a magnet can also be used to produce electricity? This property of magnets was known in 1831. A scientist named Michael Faraday found that a magnet can be used to produce electricity." },
        { type: 'image-group', images: [
          { src: '/images/science/ch07/faradays-coil-diagram.jpg', caption: "Faraday's coil: a magnet moved back and forth through a wire coil" }
        ] },
        { type: 'p', text: "The drawing shows, in a simple way, what Faraday did. He moved a strong magnet back and forth through a coil of wire. Electrons moved along the wire! How did this happen? Electrons were not moving along the wire before the magnet was passed through it." },
        { type: 'p', text: "You may know that a magnet has lines of force around it. These lines of force cause some metal objects to move toward the magnet. They can also make electrons move inside a wire. Moving electrons produce an electric current." },
        { type: 'image-group', images: [
          { src: '/images/science/ch07/magnetic-lines-of-force.jpg', caption: 'Magnetic lines of force' }
        ] }
      ],
      [
        { type: 'image-group', images: [
          { src: '/images/science/ch07/generator-power-plant.jpg', caption: 'Generator' }
        ] },
        { type: 'p', text: "Faraday's discovery was used to make a machine that is still in use today. This machine is a {{generator}}. A generator changes energy of motion into electrical energy. When coils of wire cut through a strong magnetic field, electrons move through the wire. To keep the electrons moving, either the wire or the magnet must be kept moving." },
        { type: 'p', text: "To produce electricity, a generator needs energy from an outside source. Most of this energy comes from the burning of fuels, such as coal, oil, and gas." },
        { type: 'p', text: "The drawing shows how electrical energy is produced by a generator. Look at the drawing as you read each step. 1. Gas is burned to heat water to produce steam. 2. The steam turns the blades of a {{turbine}}. A turbine is a device that is made up of a wheel and blades." }
      ],
      [
        { type: 'image-group', images: [
          { src: '/images/science/ch07/how-generator-produces-electricity.jpg', caption: 'How a generator produces electricity' }
        ] },
        { type: 'p', text: "3. The turbine is attached to a generator, which is shown as a magnet inside a coil of wire. As the turbine moves, it turns the magnet. This produces an electric current inside the coil of wire. 4. The current produced in the coil of wire lights the bulb." },
        { type: 'p', text: "Generators are not the only way we can produce electricity. You may own flashlights, small radios, and toys that need a supply of energy. They do not have generators. Instead they use a device commonly called a battery. A battery is really two or more {{electric cells}} joined together. An electric cell is a device that changes chemical energy to electrical energy." }
      ],
      [
        { type: 'p', text: "One type of electric cell is called a dry cell. A dry cell uses a chemical paste, carbon rod, and zinc case to produce a flow of electrons. Chemical reactions occur inside the dry cell. One reaction causes the walls of the zinc case to become negatively charged. Another reaction causes the carbon rod to become positively charged. The zinc case is called the negative pole. The carbon rod is called the positive pole. If the dry cell is connected to a circuit, electrons flow from the negative pole to the positive. This movement of electrons forms an electric current." },
        { type: 'p', text: "A true battery is made of two or more cells. Most car batteries are made of six cells. A car battery does not use a chemical paste to make electricity. Instead it uses acid and water, which react with metal plates. The chemical reaction of the metal and acid produces a flow of electrons. Such a battery is called a wet cell battery." },
        { type: 'image-group', images: [
          { src: '/images/science/ch07/inside-dry-cell-diagram.jpg', caption: 'Inside a dry cell' },
          { src: '/images/science/ch07/car-battery-cutaway.jpg', caption: 'A car battery, a wet cell battery' }
        ] }
      ],
      [
        { type: 'heading', text: 'Using Electricity' },
        { type: 'p', text: "Every day you use electricity in many ways. You may wake up to the sound of an electric alarm clock. You may eat breakfast cooked on an electric stove. You use electricity at home and in school. It is also used in stores and factories. Look at the drawing of the house. How many uses of electricity can you find?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch07/house-electricity-uses-cutaway.jpg', caption: 'Ways electricity is used throughout a house' }
        ] },
        { type: 'p', text: "To be useful, electricity must be changed to other kinds of energy. Think back to what you know about magnets. The electromagnet is a magnet that forms when a current passes through a wire coiled around a metal core. A giant electromagnet can be used to lift heavy metal objects in a scrapyard. This is an example of how electricity can be changed to another kind of energy." }
      ],
      [
        { type: 'p', text: "Electrical energy can also be changed to mechanical energy. Mechanical energy is energy of moving machine parts. You can see this change in an electric motor. An electric motor is a machine that changes electrical energy to mechanical energy. When you plug a motor into a wall outlet, the electricity turns the motor. Mixers, fans, and power tools all have motors. Look again at the drawing of the house on page 171. Where are motors used?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch07/motors-in-appliances.jpg', caption: 'Motors in electric appliances' }
        ] },
        { type: 'p', text: "Electricity is also an important source of light and heat. For example, in a light bulb or a toaster, electricity is changed to light or heat energy. Let's see how a light bulb produces light. The light bulb has a glass cover, a base, and a {{filament}}. The filament is a thin coil of wire. When a current moves through the filament it becomes hot. The hot filament glows and gives off light. The glass cover prevents air from reaching the filament. What would happen if air reached the glowing filament?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch07/light-bulb-filament-diagram.jpg', caption: 'The parts of a light bulb: glass cover, filament, and base' }
        ] }
      ],
      [
        { type: 'heading', text: 'Measuring Electricity' },
        { type: 'p', text: "Each day great amounts of electrical energy are used in homes, schools, and offices. How is electricity used in the picture of the office building? You use a certain amount of electricity when you watch television for an hour. You use a different amount when you read for 2 hours by the light of a lamp. Have you ever had someone tell you to turn off a light? Energy use costs money. Someone must pay for all the energy you use. But before you can pay for it, it has to be measured. The person in the picture is reading a meter that measures the amount of electricity used." },
        { type: 'image-group', images: [
          { src: '/images/science/ch07/world-trade-center-night.jpg', caption: 'The World Trade Center, New York City' },
          { src: '/images/science/ch07/reading-electric-meter.jpg', caption: 'Reading an electric meter' }
        ] },
        { type: 'p', text: "Electricity is used to do work. The more work a device does, the more electricity it uses. Also, the faster a device works, the more electricity it uses. The amount of work that is done in a certain period of time is called power. Small amounts of electric power are measured in units called {{watts}}. Large amounts of power are measured in kilowatts. A kilowatt is 1,000 watts." }
      ],
      [
        { type: 'p', text: "Most electric devices have the number of watts they use printed on them. One motor may have 50 watts printed on it. Another motor may have 100 watts printed on it. The 100-watt motor uses twice as much energy as the 50-watt motor in the same amount of time. Look at the light bulbs in the picture. How many watts does each bulb use? Which one uses the most power?" },
        { type: 'p', text: "Electric companies measure how much electricity a customer uses in {{kilowatt-hours}}. A kilowatt-hour is equal to 1,000 watts of electricity used for 1 hour. A 100-watt motor can run for 10 hours before it uses a kilowatt-hour of electricity. How long can a 50-watt light bulb burn before it uses a kilowatt-hour of electricity?" },
        { type: 'p', text: "Meters measure the amount of electricity used in a building. Do you know where the meter is at your house? The meter shows how many kilowatt-hours of electricity were used in your home. Each kilowatt-hour costs a certain amount of money. Look at the picture of an electric bill. How many kilowatt-hours of electricity were used during the month? How much did the electricity cost?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch07/light-bulbs-wattage.jpg', caption: 'Light bulbs of different wattages' },
          { src: '/images/science/ch07/electric-bill.jpg', caption: 'Electric bill' }
        ] }
      ],
      [
        { type: 'heading', text: 'Using Electricity Safely' },
        { type: 'p', text: "Every building has safety devices to help keep electricity safe. {{Fuses}} and circuit breakers protect buildings against fire. How do they do this? Each circuit is made to handle a certain amount of electric current. If too many appliances are plugged into a circuit, the wires may become too hot. When this happens, fuses and circuit breakers help to keep fires from starting." },
        { type: 'image-group', images: [
          { src: '/images/science/ch07/good-blown-fuse.jpg', caption: 'A good fuse and a blown fuse' },
          { src: '/images/science/ch07/fuse-box.jpg', caption: 'Fuse box' },
          { src: '/images/science/ch07/circuit-breakers.jpg', caption: 'Circuit breakers' }
        ] },
        { type: 'p', text: "These two safety devices are made to break the circuit if the wires become too hot. A metal strip inside a fuse melts and the fuse blows. This breaks the circuit. A special switch in a circuit breaker turns off to break the circuit." },
        { type: 'p', text: "Electricity should not be allowed to flow again until the cause of the problem is found. The number of appliances on the circuit should be checked. There may be too many. There may also be something wrong with one of the appliances. When the circuit has been checked, the current can be turned on again. The blown fuse can be replaced with a new fuse. The switch on the circuit breaker can be turned on again." }
      ],
      [
        { type: 'sidebar', text: "You too can help prevent electrical accidents. The following simple rules will help protect you from harm: DON'T put anything except an electrical plug into an electrical outlet. DON'T touch any electric appliance while you are wet. DON'T use an electric appliance that has a frayed cord. DON'T run an electrical cord under a carpet. DON'T plug too many electric devices into one outlet. DON'T touch a fallen power line. DON'T fly a kite near power lines. DON'T swim, play in an open field, or stand under a tree during a lightning storm." },
        { type: 'image-group', images: [
          { src: '/images/science/ch07/safety-donts-outlet-toaster.jpg', caption: "Don't put anything but a plug into an outlet; don't touch an appliance while wet" },
          { src: '/images/science/ch07/safety-donts-grid.jpg', caption: "Don't run a cord under a carpet, overload an outlet, or touch a fallen power line; don't fly a kite near power lines or stay outside during a lightning storm" }
        ] }
      ],
      [
        { type: 'summary', text: "There are two kinds of electricity — static electricity and current electricity." },
        { type: 'summary', text: "Static electricity is an electric charge that does not move." },
        { type: 'summary', text: "Current electricity is the movement of electrons." },
        { type: 'summary', text: "A series circuit is one in which current can follow only one path." },
        { type: 'summary', text: "A parallel circuit is one in which current can follow more than one path." },
        { type: 'summary', text: "A generator is a machine that changes mechanical energy into electrical energy." },
        { type: 'summary', text: "An electric cell is a device that changes chemical energy to electrical energy." },
        { type: 'summary', text: "An electric motor is a machine that changes electrical energy to mechanical energy." },
        { type: 'summary', text: "The amount of electricity used is measured in kilowatt-hours." },
        { type: 'summary', text: "Fuses and circuit breakers are safety devices in electric circuits." }
      ],
      [
        { type: 'review', title: 'Reviewing the Chapter', sections: [
          {
            heading: 'Science Words',
            instructions: 'Identify each of the following.',
            items: [
              { prompt: "It protects your home from fire. It is made of glass and metal. It is small enough to hold in your hand. What is it?", answer: "a fuse" },
              { prompt: "It is coiled and it glows. Electric current passes through it. It is inside a glass case. What is it?", answer: "a filament" },
              { prompt: "It contains a chemical paste. A carbon rod passes through the middle of it. Electricity is produced inside it. What is it?", answer: "a dry cell (electric cell)" }
            ]
          },
          {
            heading: 'Matching',
            instructions: 'Write the letter of the term that best matches the definition. Not all the terms will be used.',
            items: [
              { prompt: "Unit for measuring small amounts of electric power", answer: "watt" },
              { prompt: "Circuit in which current can follow only one path", answer: "series circuit" },
              { prompt: "Matter through which an electric current moves easily", answer: "conductor" },
              { prompt: "Device that changes chemical energy to electrical energy", answer: "electric cell" },
              { prompt: "Atom that has no charge", answer: "neutral" },
              { prompt: "Path through which an electric current flows", answer: "circuit" },
              { prompt: "Circuit in which current can follow more than one path", answer: "parallel circuit" },
              { prompt: "Machine that changes energy of motion into electrical energy", answer: "generator" }
            ]
          }
        ] }
      ],
      [
        { type: 'image-group', images: [
          { src: '/images/science/ch07/review-drawings-dry-cell-bulb.jpg', caption: 'Numbered drawings of a dry cell and a light bulb' }
        ] },
        { type: 'review', title: 'Reviewing the Chapter', sections: [
          {
            heading: 'Understanding Ideas',
            items: [
              { prompt: "Write the correct term for each number in the drawings.", answer: "1. positive pole  2. negative pole  3. carbon rod  4. zinc case  5. chemical paste  6. dry cell  7. glass cover  8. filament  9. base" },
              { prompt: "Look at the drawing of the house on page 171. List all the electrical appliances shown.", answer: "Answers will vary — look for lights, kitchen appliances, heating and cooling devices, and electronics shown in the house cutaway." },
              { prompt: "Explain how electrical energy is produced by a generator. Describe how you could make a model of a generator.", answer: "A turbine spins a magnet inside a coil of wire; the moving magnetic field pushes electrons through the coil, producing an electric current." },
              { prompt: "Name five safety rules that should be followed when using electricity.", answer: "For example: never touch an appliance with wet hands, don't overload an outlet, keep cords away from carpets and heat, never touch a fallen power line, and replace frayed cords." }
            ]
          },
          {
            heading: 'Using Ideas',
            items: [
              { prompt: "Look at the next electric bill you get at your house. How many kilowatt-hours did you use? How much do you have to pay for each kilowatt-hour?", answer: "Answers will vary depending on your household's electric bill." },
              { prompt: "Do a survey of electrical safety in your home. Look for things that do not follow the safety rules found on page 176. Discuss with your family how the hazards can be corrected.", answer: "Answers will vary depending on what you find at home." }
            ]
          }
        ] }
      ]
    ]
  },
  "Ch.08 · Sources of Energy": {
    title: "Sources of Energy",
    pages: [
      [
        { type: 'heading', text: 'Chapter 8 · Sources of Energy' },
        { type: 'p', text: "Think about how you used energy today. You used energy to get dressed — that energy came from the food you ate. Perhaps you rode to school in a bus or a car. Where do buses and cars get the energy to move?" },
        { type: 'p', text: "The \"solar power tower\" in the picture is a modern device that uses the sun as a source of energy: the many mirrors focus sunlight onto the tower, and the sunlight is used to produce electricity. The sun is one source of energy that people use, but the earth has other energy sources too. Some of these sources are plentiful but hard to collect; others are scarce. In this chapter you will learn about these energy sources and some of the problems involved in using them." }
      ],
      [
        { type: 'image-group', images: [
          { src: '/images/science/ch08/solar-power-tower.jpg', caption: 'A solar power tower, using mirrors to focus sunlight onto a central tower' }
        ] }
      ],
      [
        { type: 'heading', text: 'Energy from Fossil Fuels' },
        { type: 'p', text: "All machines need energy to do work. Some machines get their energy from muscle power — a bicycle is a machine that runs on muscle power. But most machines used today run on another source of energy: fossil fuels. A {{fossil fuel}} is a fuel that forms from the remains of dead plants and animals. Coal, oil, and natural gas are fossil fuels." },
        { type: 'p', text: "Millions of years ago the earth was warm and wet, and much of its surface was swampy. Many green plants grew and died in these swamps, and each plant had energy stored in it. Year after year, more plants died and piled up, and the land sank beneath their weight. Seas began to form, and streams emptying into the seas carried sand and other material, which pushed down hard on the dead plants. Over the years, heat and pressure caused the dead plants to change into coal." },
        { type: 'image-group', images: [
          { src: '/images/science/ch08/boy-on-bicycle.jpg', caption: 'A bicycle, a machine that runs on muscle power' },
          { src: '/images/science/ch08/swamp-plants-coal.jpg', caption: 'Ancient swamp plants that became coal' }
        ] }
      ],
      [
        { type: 'p', text: "In other places, the earth of the past was covered with shallow seas. Tiny living things in these seas died and fell to the bottom; after many years they became covered with sand, mud, and other material. Heat and pressure changed the remains of these living things into oil and natural gas." },
        { type: 'p', text: "Coal, oil, and gas are taken from the earth. Coal and gas do not have to be changed for use as fuels, but oil taken from the earth — called {{crude oil}} — must be changed before it can be used. Crude oil is changed into useful products in a refinery. These products include fuels such as gasoline, diesel fuel, and home heating oil." },
        { type: 'image-group', images: [
          { src: '/images/science/ch08/oil-well.jpg', caption: 'An oil well, drawing crude oil from the earth' },
          { src: '/images/science/ch08/oil-refinery-diagram.jpg', caption: 'A refinery, changing crude oil into useful products' }
        ] }
      ],
      [
        { type: 'p', text: "Fossil fuels have many uses, but the most important is as a source of energy. Before their energy can be used, fossil fuels must be burned — this process is called {{combustion}}. In combustion, oxygen from the air combines with a fuel, producing heat and light." },
        { type: 'p', text: "Most of our electricity comes from the heat of burning fossil fuels. Coal, for example, can be burned to heat water — when the water boils, it changes to steam, and the steam is forced against a fan-shaped turbine. The force of the steam turns the blades of the turbine, which is attached to a generator. As the turbine turns the generator, it produces electricity, and power lines carry that electricity to other places." },
        { type: 'image-group', images: [
          { src: '/images/science/ch08/coal-electricity-diagram.jpg', caption: 'How burning coal is used to produce electricity' }
        ] },
        { type: 'p', text: "Fossil fuels are used in many other ways too. Cars, trucks, planes, and trains all burn fossil fuels — the heat from burning them is changed into the energy of motion by engines. Factories burn fossil fuels to make their products. The table on the next page lists the main energy uses of fossil fuels." }
      ],
      [
        { type: 'image-group', images: [
          { src: '/images/science/ch08/fossil-fuel-uses-table.jpg', caption: 'Energy uses of fossil fuels' }
        ] },
        { type: 'p', text: "Supplies of fossil fuels are limited. Once they are used, they are gone forever — they cannot be replaced. The world will someday run out of this major energy source, so people must make wise use of fossil fuels." },
        { type: 'activity', text: "Finding out: Are you wasting energy? You can locate heat energy leaks at home and at school. Get a pencil, a piece of plastic wrap, and some transparent tape. Tape the plastic wrap along one side of the pencil so it hangs down about 15 cm — you have made an energy-leak finder. Test your classroom or a room at home for energy leaks by holding the finder where you think air might be leaking to the outside, such as around windows and doors. If there is a leak, the plastic wrap will move. Find out what could be done to prevent this waste of energy." },
        { type: 'image-group', images: [
          { src: '/images/science/ch08/energy-leak-finder.jpg', caption: 'Making an energy-leak finder for the activity' }
        ] }
      ],
      [
        { type: 'heading', text: 'Energy from Atoms' },
        { type: 'p', text: "The second major source of energy used in the world is {{nuclear energy}}. You have learned that the atom is a small particle from which all matter is made, and that there is a nucleus at the center of every atom. The energy stored in the nucleus of an atom is called nuclear energy, and it has to be released before it can be used." },
        { type: 'p', text: "There are two ways to release the energy stored in an atom. The most common process is called {{fission}} — in nuclear fission, the nucleus of an atom is split, releasing energy. The atom most often used in fission is the uranium atom." },
        { type: 'image-group', images: [
          { src: '/images/science/ch08/nuclear-power-plant.jpg', caption: 'Nuclear power plant' }
        ] }
      ],
      [
        { type: 'p', text: "The other process used to release the energy stored in an atom is called {{fusion}}. Fusion is the opposite of fission: in nuclear fusion, the nuclei of atoms are combined, releasing energy. In both fission and fusion, large amounts of energy are released." },
        { type: 'p', text: "The most important use of nuclear energy today is to produce electricity. Fission is the process used to produce this energy. It takes place in a special structure called a nuclear reactor, where the large amounts of heat energy that result from fission are controlled. In nuclear power plants, the heat from fission is used to change water into steam — just as in coal-burning power plants, the steam turns a turbine that is attached to a generator, which produces electricity." },
        { type: 'image-group', images: [
          { src: '/images/science/ch08/nuclear-energy-diagram.jpg', caption: 'How nuclear energy is used to produce electricity' }
        ] }
      ],
      [
        { type: 'p', text: "Fusion is not used today to produce useful energy. This is because scientists have not yet learned to control the great amount of energy released from fusion." },
        { type: 'image-group', images: [
          { src: '/images/science/ch08/nuclear-test-reactor.jpg', caption: 'Nuclear test reactor' }
        ] },
        { type: 'p', text: "Although fusion cannot be controlled, almost all the energy on the earth comes from fusion, because the sun is the source of most of the earth's energy, and the sun produces energy through fusion." },
        { type: 'p', text: "Nuclear energy is one way to meet the world's energy needs — some people think its benefits outweigh its problems. People who favor using nuclear energy say it helps save fossil fuels." }
      ],
      [
        { type: 'image-group', images: [
          { src: '/images/science/ch08/uranium-coal-oil-comparison.jpg', caption: 'How much energy a gram of uranium produces, compared to coal and oil' }
        ] },
        { type: 'p', text: "Electricity can be produced by using a lot less uranium than by using either coal or oil. In fact, just 1 gram of uranium produces as much energy as 3 metric tons of coal or 14 barrels of oil." },
        { type: 'p', text: "Supporters of nuclear energy also say that it is clean energy: it does not release harmful smoke into the air, as happens when coal is burned." },
        { type: 'p', text: "But other people point to the problems of using nuclear energy. The fuel used inside these power plants gives off radiation — the release of energy and particles from atoms — which can harm living things, and some people fear that radiation inside power plants might leak to the outside." },
        { type: 'p', text: "Another problem is where to put the wastes from nuclear reactors. Some of these wastes give off harmful radiation for hundreds of years, so getting rid of them safely is important, and scientists are still looking for ways to do this." }
      ],
      [
        { type: 'heading', text: 'Energy from the Sun' },
        { type: 'p', text: "Almost all the energy on the earth comes from {{solar energy}} — energy from the sun. Today solar energy is used mostly as a source of heat: office buildings and houses are heated with it." },
        { type: 'p', text: "One way to use solar energy is to \"trap\" it. Have you ever gotten into a closed car that had been parked in direct sunlight? A lot of heat gets trapped inside, and the air in the car may become much warmer than the air outside. Solar energy passes through the glass windows, and when it strikes the material inside the car, it changes to heat. This warms the air inside the car — and because the car is sealed, very little heat escapes, so the air keeps getting warmer. This buildup of heat is called the {{greenhouse effect}}." },
        { type: 'image-group', images: [
          { src: '/images/science/ch08/greenhouse-effect-car.jpg', caption: 'Heat trapped inside a sealed, sunlit car — the greenhouse effect' }
        ] }
      ],
      [
        { type: 'p', text: "The greenhouse effect is used to heat some houses and other buildings — this kind of heating is called passive solar heating. There are other ways to use solar energy too. One method uses large solar collectors: a {{solar collector}} is a device that collects sunlight and changes it into heat energy. Inside a solar collector there are rows of black tubes carrying water or air. Sunlight strikes the tubes and heats the water or air inside them, and the heated material is carried through pipes that run through the building. If the heat isn't needed right away, it goes to a storage area, so it can be used later on a cloudy day or at night. Systems that use pumps or other moving parts are called active solar heating." },
        { type: 'image-group', images: [
          { src: '/images/science/ch08/greenhouse-interior.jpg', caption: 'A greenhouse, heated by trapped sunlight' },
          { src: '/images/science/ch08/solar-collectors-roof.jpg', caption: 'Solar collectors mounted on a roof' }
        ] }
      ],
      [
        { type: 'p', text: "In addition to producing heat, solar energy can also be used to produce electricity, in two different ways. One is an indirect method: solar energy is first used to produce heat, the heat changes liquid water to steam, and the steam turns a turbine attached to a generator. Some solar collectors use large mirrors to gather sunlight and reflect it onto a small area on a tower, where a boiler holds water to be heated this way." },
        { type: 'p', text: "The other way to use solar energy to produce electricity is a direct method. A device called a {{solar cell}} changes solar energy directly into electrical energy. Solar cells are an energy source for many spacecraft and some buildings." },
        { type: 'image-group', images: [
          { src: '/images/science/ch08/solar-mirror-collector.jpg', caption: 'Mirrors reflecting sunlight to heat water for steam' },
          { src: '/images/science/ch08/viking-spacecraft-solar-cells.jpg', caption: 'Solar cells powering a spacecraft' }
        ] }
      ],
      [
        { type: 'p', text: "Solar energy seems to be a perfect energy source — it is clean, plentiful, and free. But there are problems in using it. One problem is that not all places receive enough sunlight to make solar energy useful. Also, solar energy is not constant: if there are several cloudy days in a row, stored heat or electrical energy may be used up." },
        { type: 'sidebar', text: "Do you know? The Solar Challenger is an airplane powered solely by the sun's energy. A total of 16,128 solar cells cover the upper surface of this one-person plane, producing electricity that runs two small motors turning the plane's propeller. The entire plane weighs less than 98 kg. On July 5, 1981, the Solar Challenger made a record-setting flight — it took off from France, flew across the English Channel, and landed more than 267 km away in England, reaching an air speed of over 75 km/h, using only energy from the sun." },
        { type: 'image-group', images: [
          { src: '/images/science/ch08/solar-challenger-plane.jpg', caption: 'The Solar Challenger, an airplane powered by the sun' }
        ] }
      ],
      [
        { type: 'activity', text: "Which direction receives more solar energy? Materials: 2 cardboard shoe boxes with lids, scissors, clear plastic wrap, transparent tape, 2 thermometers, a compass. Procedure: Cut a rectangular hole in one side of each shoe box, and cover each hole with a piece of clear plastic wrap taped in place. Place a thermometer inside each box and put the lids on. Take the boxes outdoors on a sunny day, and use a compass to find north and south — place one box so its \"window\" faces south, and the other so its window faces north. Open the boxes, check and record the starting temperature in each, then close them again. Every 10 minutes for the next 40 minutes, record the temperature inside each box, and make a graph showing how the temperature in each box changed. Conclusion: What was the difference between the starting and final temperature in each box? Which lets in more solar energy, a north-facing window or a south-facing window? In which direction should the windows of a passive-solar house face, and why?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch08/solar-box-activity-1.jpg', caption: 'Setting up the solar-box activity' },
          { src: '/images/science/ch08/solar-box-activity-2.jpg', caption: 'Recording temperatures during the solar-box activity' }
        ] }
      ],
      [
        { type: 'heading', text: 'Energy from Water' },
        { type: 'p', text: "Moving water is an important source of energy used to produce electricity. In a {{hydroelectric power plant}}, the energy of moving water turns turbines attached to generators that produce electricity. Hydroelectric power plants are built as part of dams on rivers — falling water flows through pipes inside the dam and over turbine blades at the bottom, and the moving blades turn generators." },
        { type: 'p', text: "The number of places where hydroelectric power plants can be built is limited, and when dams are built on rivers, large land areas may be flooded, which can destroy places where many plants and animals live." },
        { type: 'image-group', images: [
          { src: '/images/science/ch08/hydroelectric-dam.jpg', caption: 'A hydroelectric dam' }
        ] }
      ],
      [
        { type: 'p', text: "There is another way of using the energy of flowing water. If you've ever spent a day at an ocean beach, you've probably noticed that the water level along the shore rises and falls — in most areas, twice a day. These daily movements of the water level are called {{tides}}." },
        { type: 'p', text: "{{Tidal energy}} — the energy of rising and falling tides — is another energy source that can be used to produce electricity. A dam is built across a narrow opening to the ocean; during high and low tides, water moves in and out of openings in the dam, flowing over turbine blades inside it, and the turbines turn generators. Very few tidal power plants are in use today — tidal energy will probably never be a major energy source, because there are only a few places in the world with a large enough difference between low and high tides to produce much energy." },
        { type: 'image-group', images: [
          { src: '/images/science/ch08/tidal-energy-diagram.jpg', caption: 'How a tidal power plant produces electricity' },
          { src: '/images/science/ch08/tidal-power-plant.jpg', caption: 'A tidal power plant' }
        ] }
      ],
      [
        { type: 'heading', text: 'Energy from Heat in the Earth' },
        { type: 'p', text: "Almost all energy on the earth comes from solar energy, but there is also an energy source deep inside the earth, called {{geothermal energy}} — energy from natural heat trapped beneath the earth's surface. This heat melts rock inside the earth, forming magma. In some places the magma comes close to the earth's surface and collects in areas called hot spots — these are areas of geothermal energy." },
        { type: 'p', text: "How can geothermal energy be used to produce electricity? When water in the ground comes into contact with a hot spot, it turns to steam. By drilling wells into the earth at hot spots, this steam can be released." },
        { type: 'image-group', images: [
          { src: '/images/science/ch08/geothermal-energy-diagram.jpg', caption: 'How geothermal energy is used to produce electricity' }
        ] }
      ],
      [
        { type: 'p', text: "The released steam can be used to turn turbines that run generators." },
        { type: 'p', text: "In some places, steam and hot water reach the surface without drilling — there are deep cracks in rock inside the earth through which the steam and hot water can move, and when they reach the surface, they may gush out of the ground on their own. This is called a geyser. You can see one geyser, Old Faithful, in the picture." },
        { type: 'p', text: "The geothermal power plant in the picture is the largest in the world. This plant, called The Geysers, is located in California, and it supplies enough electricity to run a large city. There are plans to expand The Geysers." },
        { type: 'p', text: "But there are problems with geothermal energy: many areas of geothermal energy are far from any large towns or cities, so electricity produced there would have to be carried great distances, which can be very costly." },
        { type: 'image-group', images: [
          { src: '/images/science/ch08/geyser-old-faithful.jpg', caption: 'A geyser — Old Faithful' },
          { src: '/images/science/ch08/geothermal-power-plant.jpg', caption: 'Geothermal power plant' }
        ] }
      ],
      [
        { type: 'heading', text: 'Energy from the Wind' },
        { type: 'p', text: "The wind has been used as a source of energy for more than a thousand years. Wind energy is the energy of moving air — long ago people used windmills to grind wheat into flour, and today windmills are being used to make electricity." },
        { type: 'image-group', images: [
          { src: '/images/science/ch08/old-windmill.jpg', caption: 'Old windmill used for grinding wheat' }
        ] },
        { type: 'p', text: "Modern windmills look different from windmills of long ago, but they work in much the same way: the wind turns blades at the top of the windmill, and the blades are connected to a generator that produces electricity. This device is often called a wind turbine." },
        { type: 'p', text: "The high cost of other energy sources has made windmills popular in some places, but there are problems with wind energy too. One is that there aren't many places where the wind blows strong and steady. Another is the high cost of building and fixing windmills. So energy from the wind is not likely to do much to help meet the world's future energy needs." },
        { type: 'image-group', images: [
          { src: '/images/science/ch08/modern-wind-turbine.jpg', caption: 'Modern wind turbine' }
        ] }
      ],
      [
        { type: 'activity', text: "Can the wind make electricity where you live? Materials: nylon thread (20 cm), a Ping-Pong ball, transparent tape, a colored marking pen, a protractor, a cardboard strip. Procedure: Tape one end of the thread to the ball, color the thread so it's easier to see, and tape the other end to the center of a protractor, with a cardboard strip taped on as a handle — you've made a device to measure wind speed. Take it outdoors and hold the protractor level with the ground; when the wind blows the ball, the thread will line up with a mark on the protractor. Use a table converting mark number to wind speed (in km/h) to read the wind speed. Take readings several times a day for 4–5 days and record your findings. A wind turbine needs a wind speed of 13 km/h or over to produce electricity. Conclusion: Is there enough wind to make electricity where you live? What effect would the steadiness of the wind have on a wind turbine's ability to produce electricity?" }
      ],
      [
        { type: 'heading', text: 'Energy from Living Things' },
        { type: 'p', text: "Millions of years must pass before the remains of living things become fossil fuels. Today scientists are looking for ways to change plant and animal matter directly into energy. Plant and animal matter is called {{biomass}}, and the process of changing biomass into usable energy is called bioconversion." },
        { type: 'p', text: "A campfire is a simple example of bioconversion — wood is the biomass that is changed to produce energy. In recent years many people in the United States have bought wood-burning stoves, and use them to heat their homes. People save money by using wood as a fuel, since oil and natural gas are so costly." },
        { type: 'image-group', images: [
          { src: '/images/science/ch08/wood-burning-stove.jpg', caption: 'Wood-burning stove used to heat a home' }
        ] }
      ],
      [
        { type: 'p', text: "There is also biomass in the trash people throw away. In the United States, the average person produces more than 1 kg of trash each day, and much of it can be burned to make heat — this heat can be used to change water into steam, which can run generators. Bioconversion of trash helps in two ways: it produces useful energy from low-cost fuel, and it gets rid of unwanted materials." },
        { type: 'image-group', images: [
          { src: '/images/science/ch08/bioconversion-power-plant.jpg', caption: 'Bioconversion power plant' }
        ] },
        { type: 'p', text: "Trash containing dead plant and animal matter can be used to make energy in another way too. Tiny living things called bacteria can use the biomass in trash as a source of food, and in the process they produce a fuel called methane gas, which can be burned for heat energy." },
        { type: 'p', text: "There is yet another way plants can supply energy: alcohol is added to gasoline to help stretch the fuel supply, making a gasoline-and-alcohol mixture called gasohol. The alcohol comes from a process in which corn and yeast are mixed — yeasts are tiny nongreen plants that use the sugar stored in corn as food, and as they do, they produce alcohol." },
        { type: 'image-group', images: [
          { src: '/images/science/ch08/gasohol-pump.jpg', caption: 'Gasohol — a gasoline-and-alcohol mixture' }
        ] }
      ],
      [
        { type: 'p', text: "You can see that there are many ways in which living things and the remains of living things help supply energy." },
        { type: 'summary', text: "A fossil fuel is a fuel that forms from the remains of dead plants and animals." },
        { type: 'summary', text: "Fission and fusion are processes used to release the nuclear energy of atoms." },
        { type: 'summary', text: "Solar energy can be used to heat buildings and produce electricity." },
        { type: 'summary', text: "Moving water can be used to produce electrical energy in hydroelectric and tidal power plants." },
        { type: 'summary', text: "Geothermal energy is energy from natural heat trapped beneath the earth's surface." },
        { type: 'summary', text: "Modern windmills use the energy of the wind to produce electricity." },
        { type: 'summary', text: "Plant and animal matter can be changed into useful forms of energy through bioconversion." }
      ],
      [
        { type: 'review', title: 'Reviewing the Chapter', sections: [
          {
            heading: 'Science Words',
            instructions: 'Complete each sentence with the correct term.',
            items: [
              { prompt: "Oil is one kind of ___.", answer: "fossil fuel" },
              { prompt: "Oil that is taken from the earth is called ___.", answer: "crude oil" },
              { prompt: "Crude oil is changed into useful products in a/an ___.", answer: "refinery" },
              { prompt: "During ___, oxygen from the air combines with a fuel, producing heat and light.", answer: "combustion" },
              { prompt: "The energy stored in the nucleus of an atom is called ___.", answer: "nuclear energy" },
              { prompt: "The energy released when the nuclei of atoms are combined is released in the process of ___.", answer: "nuclear fusion" },
              { prompt: "The nucleus of an atom is split in the process of ___.", answer: "nuclear fission" },
              { prompt: "The splitting of atoms takes place in a structure called a/an ___.", answer: "nuclear reactor" }
            ]
          },
          {
            heading: 'Matching',
            instructions: 'Write the term that best matches the definition.',
            items: [
              { prompt: "Device that collects sunlight and changes it to heat energy", answer: "solar collector" },
              { prompt: "Melted rock inside the earth", answer: "magma" },
              { prompt: "Plant and animal matter", answer: "biomass" },
              { prompt: "Areas of geothermal energy", answer: "hot spots" },
              { prompt: "Device that changes solar energy to electricity", answer: "solar cell" },
              { prompt: "Daily movement of the water level along the shore", answer: "tides" },
              { prompt: "Energy from the sun", answer: "solar energy" }
            ]
          }
        ] }
      ],
      [
        { type: 'review', title: 'Reviewing the Chapter', sections: [
          {
            heading: 'Understanding Ideas',
            items: [
              { prompt: "Which energy source uses a dam built across a river, with flowing water turning turbines?", answer: "hydroelectric power" },
              { prompt: "Which energy source uses a dam built across a narrow ocean opening, powered by the rise and fall of the tides?", answer: "tidal energy" },
              { prompt: "Which energy source comes from changing plant and animal matter into usable fuel?", answer: "bioconversion" },
              { prompt: "Which energy source comes from burning coal, oil, or natural gas?", answer: "energy from a fossil fuel" },
              { prompt: "Which effect describes heat building up inside a sealed, sunlit space, like a closed car or a greenhouse?", answer: "the greenhouse effect" },
              { prompt: "Which energy source comes from natural heat trapped beneath the earth's surface?", answer: "geothermal energy" },
              { prompt: "List one problem with each of the energy sources above.", answer: "For example: hydroelectric dams can flood large land areas; tidal plants only work where tides vary a lot; geothermal plants are often far from cities; fossil fuels are non-renewable and pollute the air." },
              { prompt: "Describe three ways to use energy from the sun.", answer: "Passive solar heating (trapping heat through glass), solar collectors that heat water or air, and solar cells that convert sunlight directly into electricity." }
            ]
          },
          {
            heading: 'Using Ideas',
            items: [
              { prompt: "Suppose you had to design a house for your family. Which energy source(s) would you use for heat and electricity? Where would you build the house, and how does its location relate to your energy choice? List the benefits and problems of each source you chose.", answer: "Answers will vary — consider local sunlight, wind, water, or geothermal resources available at the chosen location." },
              { prompt: "Use pictures from old magazines to make a poster showing different fossil fuels and how they are used." }
            ]
          }
        ] }
      ]
    ]
  },
  "Ch.09 · Changes in the Earth": {
    title: "Changes in the Earth",
    pages: [
      [
        { type: 'heading', text: 'Chapter 9 · Changes in the Earth' },
        { type: 'p', text: "Have you ever seen a place that looked like this? What caused the rocks to be shaped in these ways? This place is Bryce Canyon in Utah. The rocks in Bryce Canyon were shaped by the movement of water over millions of years." },
        { type: 'p', text: "The land that covers the earth has changed its shape many times during the history of the earth. The force of moving water, ice, and air have caused these changes. In this chapter you will learn how the earth is worn away in some places, and how it is built up in others. You will see how water, ice, and wind {{move}} materials from place to place." },
        { type: 'image-group', images: [
          { src: '/images/science/ch09/bryce-canyon.jpg', caption: 'Bryce Canyon, Utah' }
        ] }
      ],
      [
        { type: 'heading', text: 'Weathering Changes the Land' },
        { type: 'p', text: "How does physical weathering occur? If you view the earth while flying in a plane, you can see many features of its surface — high mountains, rolling hills, flat land, valleys, and cliffs. The surface of the earth is always changing. It is changed by natural processes. In time, flat land may become a mountain range, and hills and mountains may slowly be worn down. The land is worn down by weathering. Weathering is all the processes that break rock into smaller pieces. The processes of weathering can be put into two groups." },
        { type: 'image-group', images: [
          { src: '/images/science/ch09/mountain-erosion-view.jpg', caption: 'A weathered mountain, seen from the air' },
          { src: '/images/science/ch09/eroded-hills-valley.jpg', caption: 'Hills and a valley shaped by weathering' },
          { src: '/images/science/ch09/eroded-canyon-aerial.jpg', caption: 'Weathered cliffs and a canyon, seen from the air' }
        ] }
      ],
      [
        { type: 'p', text: "One kind of weathering is called physical weathering. Physical weathering is all the processes that break apart rock without changing its chemical makeup. This weathering causes rock to change its size and shape — the rock is broken into smaller pieces, but the pieces have the same makeup as the rock they came from. The only change they have gone through is a physical one." },
        { type: 'p', text: "The effect that the freezing and melting of water has on rock is a type of physical weathering. In some mountain regions the daytime temperatures are above the freezing point of water. Water seeps into cracks in rock. At night, temperatures drop below the freezing point, so the water turns to ice." },
        { type: 'p', text: "When water freezes, it expands. As the water in a crack expands, it pushes with great force against both sides of the crack. This causes the crack to become larger. The daily freezing and melting of water causes large rocks to break up into smaller pieces. This kind of physical weathering is called frost action." },
        { type: 'image-group', images: [
          { src: '/images/science/ch09/ice-on-rock.jpg', caption: 'Ice on rock' },
          { src: '/images/science/ch09/cliffs-weathered-frost-action.jpg', caption: 'Cliffs weathered by frost action' }
        ] }
      ],
      [
        { type: 'p', text: "If you live in a place where it gets cold enough, you may see the result of frost action. During the winter, large cracks can form in sidewalks. Many cracks and holes, such as potholes, also form in roads. These are caused by the freezing and melting of water." },
        { type: 'p', text: "Plants can also cause rocks to crack and break apart. Small plants and trees can grow in soil found in the cracks of rocks. As they grow, the plants push against the sides of the cracks, causing them to get larger, and in time they split the rocks. You may have seen tree roots that have lifted up parts of a sidewalk." },
        { type: 'image-group', images: [
          { src: '/images/science/ch09/pothole-frost-action.jpg', caption: 'A pothole caused by frost action' },
          { src: '/images/science/ch09/tree-trunk-split-rock.jpg', caption: 'A tree trunk that has split a large rock' },
          { src: '/images/science/ch09/sidewalk-lifted-tree-roots.jpg', caption: 'Tree roots lifting up part of a sidewalk' }
        ] }
      ],
      [
        { type: 'activity', text: "How does the freezing and melting of water weather rocks? Wash out an empty milk carton. Open the top of the carton and fill it completely with water. Close the top and tape it shut with masking tape. Place the carton in a freezer overnight. The next day, remove the carton from the freezer. Describe what you see. What has happened, and what do you think caused it? How could this process weather rocks?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch09/activity-milk-carton-freezer.jpg', caption: 'Finding Out: freezing a full milk carton' }
        ] },
        { type: 'p', text: "Physical weathering can also be seen along an ocean shore. Large waves pound rocks at the shore. When waves crash against rocky cliffs, cracks can form. After a while, rocks may break away and fall into the ocean. The rocks may be lifted and dropped many times by the waves. As they are moved, the rocks strike other rocks, and in time they may be ground into small stones and pebbles. Waves may throw the stones and pebbles back against the cliffs, which helps to weather the rocks and cliffs even more. Have you ever picked up smooth, round stones from a beach? That is another example of physical weathering by ocean waves." },
        { type: 'p', text: "Wind can also weather rocks. Wind can blow small pieces of sand against rocks, which can polish and smooth them. But the wind alone does not weather rocks very much." },
        { type: 'image-group', images: [
          { src: '/images/science/ch09/ocean-waves-rocky-cliffs.jpg', caption: 'Ocean waves pounding rocky cliffs' }
        ] }
      ],
      [
        { type: 'heading', text: 'Another Kind of Weathering' },
        { type: 'p', text: "How does chemical weathering occur? Rock is also broken apart by chemical weathering. Chemical weathering is all the processes that break apart rock by changing its chemical makeup." },
        { type: 'p', text: "In some places there are large amounts of limestone and water in the ground, and chemical weathering is common there. As rain falls through air, it mixes with carbon dioxide gas, and some of this gas dissolves in the rainwater. This changes the rainwater into a weak carbonic acid, which drains through rock and soil. When it reaches limestone in the ground, it seeps into cracks and dissolves some of the limestone, making the cracks grow larger. Over thousands of years, the dissolving of limestone can form a whole system of tunnels — and large caves — under the ground." },
        { type: 'image-group', images: [
          { src: '/images/science/ch09/limestone-caves-diagram.jpg', caption: 'How limestone caves form' },
          { src: '/images/science/ch09/limestone-cave-photo.jpg', caption: 'A limestone cave' }
        ] }
      ],
      [
        { type: 'p', text: "Chemical weathering also breaks up rocks that contain iron. Rainwater contains oxygen dissolved from the air. Iron in rocks joins with this oxygen to form iron oxide, or rust — a new substance that is soft and easily breaks off rock. When it breaks off, even more of the rock's surface can be changed by falling rain. A red-orange color in rock is often a sign of iron oxide." },
        { type: 'p', text: "Mosses and other tiny plants called lichens also weather rock by chemical action. These plants grow on rock and send out rootlike parts that grow into tiny openings in the rock, producing acids that dissolve some of the rock." },
        { type: 'p', text: "Both physical and chemical weathering cause rock to break down. Chemical weathering happens fastest in places that are wet and fairly warm. Physical weathering is greatest in wet places that are cooler. Dry places show little weathering effect, except for that caused by wind. Both kinds of weathering result in the forming of soil, as pieces of weathered rock mix with the remains of living things." },
        { type: 'image-group', images: [
          { src: '/images/science/ch09/rock-iron-oxide.jpg', caption: 'Rock containing iron oxide' },
          { src: '/images/science/ch09/lichens-on-rock.jpg', caption: 'Lichens on rock' },
          { src: '/images/science/ch09/mosses-on-rock.jpg', caption: 'Mosses on rock' }
        ] }
      ],
      [
        { type: 'heading', text: 'Water Changes the Land' },
        { type: 'p', text: "How does water change the land? Most weathered materials are carried to other places. The movement of weathered rock and soil from one place to another is called erosion. Water, ice, and wind are called the agents of erosion, because moving water, moving ice, and moving air all carry away weathered materials." },
        { type: 'p', text: "The most important agent of erosion is water. The force behind water erosion is gravity, which causes water to run downhill — the steeper the hill, the faster the water flows, and the faster it flows, the greater the rate of erosion. The amount of water also affects the rate of erosion: the more water there is, the more erosion there will be." },
        { type: 'p', text: "Erosion may begin when raindrops hit the soil and break up large lumps of it. Some of the water from rain and melting snow flows over the earth's surface — this is called runoff. As runoff moves downhill, it may form small streams, which join together into larger streams and then rivers. Rivers flow into lakes or oceans." },
        { type: 'image-group', images: [
          { src: '/images/science/ch09/runoff-diagram.jpg', caption: 'How rain becomes runoff, streams, and rivers' }
        ] }
      ],
      [
        { type: 'p', text: "As water moves over the surface, it may erode soil and rocks. The amount of material moved depends partly on the amount of water, but the speed of the water is an even more important factor — fast-moving water erodes far more material than slower-moving water. If there are no plants growing in the soil, moving water may erode a lot of it." },
        { type: 'p', text: "The erosion of soil by runoff can be a problem for farmers, since the top layers of soil are rich in materials that plants need. There is a lot of erosion in hilly places, so farmers often plant rows of crops that follow the curve of the land — when it rains, the rows hold the water and soil in place." },
        { type: 'image-group', images: [
          { src: '/images/science/ch09/erosion-soil-runoff.jpg', caption: 'Erosion of soil by runoff' },
          { src: '/images/science/ch09/contour-crops-erosion-prevention.jpg', caption: 'Crops following the curve of the land to prevent erosion' }
        ] }
      ],
      [
        { type: 'p', text: "Another way to prevent soil erosion on hills is to build terraces, which are flat areas cut into a hillside that also keep water and soil from washing down. Soil erosion can also be reduced by not clearing the land of all plants." },
        { type: 'p', text: "Soil erosion is not the only effect of moving water. As water flows in a river, it wears away the riverbed — the rock under the river. The moving water carries materials that act like sandpaper, grinding the rock and wearing it away, and the weathered materials are then carried along by the river. The downward cutting of a riverbed can create a deep valley with steep sides, called a canyon. The Colorado River has been cutting the rocks of its riverbed for millions of years, forming the Grand Canyon, which is over 1.5 km deep." },
        { type: 'image-group', images: [
          { src: '/images/science/ch09/terraces-erosion-prevention.jpg', caption: 'Terraces built to prevent erosion' },
          { src: '/images/science/ch09/grand-canyon-view1.jpg', caption: 'The Grand Canyon and Colorado River' },
          { src: '/images/science/ch09/grand-canyon-view2.jpg', caption: 'The Grand Canyon and Colorado River, another view' }
        ] }
      ],
      [
        { type: 'p', text: "Ocean waves can erode sand from beaches along the shore — in some places the shoreline may lose as much as 380 cubic meters of sand each day. You have learned that erosion is greatest in fast-moving water. As a river flows downstream, the water starts to slow down, and this slowing causes the river to drop some sediments. Sediments are the materials that are dropped by the agents of erosion, including sand, soil, and rocks. The dropping of sediments by the agents of erosion is called deposition." },
        { type: 'image-group', images: [
          { src: '/images/science/ch09/lighthouse-1890s.jpg', caption: 'A lighthouse at the tip of Long Island, about 90 years ago' },
          { src: '/images/science/ch09/lighthouse-recent.jpg', caption: 'The same lighthouse today, after decades of shoreline erosion' }
        ] }
      ],
      [
        { type: 'p', text: "Erosion and deposition are related. Weathered materials are picked up and carried away from one place, then dropped, or deposited, as sediment in another place. In this way the land is constantly changing — worn down by erosion in some places, and built up by deposition in others." },
        { type: 'p', text: "In the spring, snow on the ground melts and there is often a lot of rain, so spring floods are common in some places. Flooding can erode valuable soil and destroy property, but flooding of rivers can also be helpful because of deposition. The floodwaters that overflow the banks of a river carry a lot of material, and when they soak into the ground, sediments are deposited on the land along the river." },
        { type: 'image-group', images: [
          { src: '/images/science/ch09/spring-flood.jpg', caption: 'A spring flood' }
        ] }
      ],
      [
        { type: 'p', text: "These sediments enrich the soil, so land near rivers is often good farmland." },
        { type: 'p', text: "Most rivers empty into the ocean. The place where a river empties into the ocean is called the mouth of the river. The water there moves very slowly, and much of the material carried by the river is deposited at the mouth, forming a fan-shaped landmass called a delta. The delta at the mouth of the Mississippi River is the largest in the United States." },
        { type: 'p', text: "The few remaining sediments not deposited on a delta are carried out to sea by ocean currents. Waves may carry some of these sediments back to shore, forming sand beaches, or deposit them as sandbars near the shore." },
        { type: 'image-group', images: [
          { src: '/images/science/ch09/rich-farmland-floodwaters.jpg', caption: 'Rich farmland deposited by floodwaters' },
          { src: '/images/science/ch09/mississippi-river-delta.jpg', caption: 'The Mississippi River delta' },
          { src: '/images/science/ch09/sandbar.jpg', caption: 'A sandbar' }
        ] }
      ],
      [
        { type: 'activity', text: "What factors affect the rate of erosion by water? Materials: sand-and-gravel mixture, rectangular metal baking pan, metric ruler, 2 books, plastic squeeze bottle, clock or watch with second hand. Procedure: A. Put a sand-and-gravel mixture about 3 cm deep into one half of the pan. B. Raise that end of the pan with a book, to represent material on a hillside. C. Fill a squeeze bottle with water and drop it onto the mixture at a rate of one drop every 3 seconds — what do you observe? D. Increase the rate to two drops every 3 seconds and compare the amount of erosion. E. Put another book under the same end of the pan, increasing the angle. F. Again drop two drops every 3 seconds and compare your results. Conclusion: What did the water do to the mixture? Did increasing the rate of water flow affect the amount of material moved? Did increasing the angle of the pan affect it? Using science ideas: How would a steady stream of running water affect the amount of material moved, and what body of water would this be like?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch09/activity-sand-gravel-tray.jpg', caption: 'Finding Out: setting up a sand-and-gravel tray' },
          { src: '/images/science/ch09/activity-water-drops-erosion.jpg', caption: 'Finding Out: dripping water onto the mixture' }
        ] }
      ],
      [
        { type: 'heading', text: 'Ice Changes the Land' },
        { type: 'p', text: "How do glaciers change the land? In the past, there were long periods of very cold temperatures during which ice and snow built up on the land. These periods are known as ice ages. During these ice ages, the land was covered by large, slow-moving masses of ice called glaciers. The movement of glaciers during ice ages changed the shape of much of the land. The last ice age ended about 10,000 years ago." },
        { type: 'p', text: "During the last ice age, temperatures over the earth changed from cold to warm and back again several times. During the cold periods, a lot of snow and ice piled up and the glaciers grew larger. The weight of the snow and ice caused the glaciers to move southward." },
        { type: 'p', text: "As the huge ice sheets moved forward, they weathered and eroded the land over which they moved, carrying soil, rock, and huge boulders great distances. The materials carried by glaciers scraped and cut the land, smoothing, polishing, and scratching rock. In some places, the tops of mountains were weathered and eroded by glaciers, forming rounded hills." },
        { type: 'image-group', images: [
          { src: '/images/science/ch09/rock-polished-glacier.jpg', caption: 'Rock polished by a glacier' },
          { src: '/images/science/ch09/rock-scratched-glacier.jpg', caption: 'Rock scratched by a glacier' }
        ] }
      ],
      [
        { type: 'p', text: "During the warm periods, the southern edge of the glaciers melted, leaving behind large hilly ridges of rocky material that mark the places where the glaciers stopped — such ridges can still be seen today in the northern United States and Canada." },
        { type: 'p', text: "In some places, glaciers dug out large amounts of rock and soil, and many of these dug-out areas filled in with water when the glaciers melted, becoming lakes. The lake regions of Wisconsin and Minnesota were formed this way, and glaciers even helped form the Great Lakes." },
        { type: 'image-group', images: [
          { src: '/images/science/ch09/rocky-material-glacier-deposit.jpg', caption: 'Rocky material deposited when a glacier stopped' },
          { src: '/images/science/ch09/lakes-formed-by-glacier.jpg', caption: 'A chain of lakes formed by a glacier' }
        ] }
      ],
      [
        { type: 'p', text: "In some places glaciers exist today. Ice sheets, much like the glaciers of the ice ages, are found in Greenland and the South Pole region. Smaller mountain glaciers are found in high mountains, such as the Alps and the Rocky Mountains — mountain glaciers are sometimes called rivers of ice." },
        { type: 'p', text: "Mountain glaciers scoop out material from valleys, widening them and giving them a U shape. Glaciers of past ice ages have had a great effect on changing the shape of the land, and although the erosion done by today's glaciers is limited, some scientists believe that ice sheets will return someday and spread across the earth once again." },
        { type: 'image-group', images: [
          { src: '/images/science/ch09/ice-sheet.jpg', caption: 'An ice sheet' },
          { src: '/images/science/ch09/mountain-glacier.jpg', caption: 'A mountain glacier' },
          { src: '/images/science/ch09/u-shaped-valley-glacier.jpg', caption: 'A U-shaped valley formed by a glacier' }
        ] }
      ],
      [
        { type: 'activity', text: "How does a glacier change the land? Materials: sand-and-gravel mixture, small paper cup, metric ruler, freezer, metal baking pan, modeling clay. Procedure: A. Place about 2 cm of the sand-and-gravel mixture in a paper cup. B. Fill the cup with water, stir, and freeze it overnight. C. Line the bottom of a baking pan with about 1 cm of modeling clay, then top it with about 1 cm of the sand-and-gravel mixture. D. The next day, remove the frozen mixture from the paper cup — this represents a glacier. E. Place the ice mixture in the pan and press down as you slowly move it across the tray. What happens to the sand-and-gravel mixture and to the clay? Conclusion: What do the particles frozen in the ice represent? How do glaciers affect loose rock and soil, and layers of smooth, soft rock, as they move over them? Using science ideas: What must happen to cause a glacier to deposit the material it carries?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch09/activity-glacier-model.jpg', caption: 'Finding Out: modeling how a glacier moves material' }
        ] }
      ],
      [
        { type: 'heading', text: 'Wind Changes the Land' },
        { type: 'p', text: "How does wind change the land? Like water and ice, wind carries materials from one place to another. When the wind blows, it lifts and carries small dry particles — mostly sand, soil, and dust. When these particles are blown against rock, they can cause physical weathering." },
        { type: 'p', text: "As wind blows sand from one place to another, its speed may be slowed by rocks or plants. When the wind slows, it deposits the sand it carries, causing the sand to pile up. This deposition of wind-carried sand forms piles called sand dunes, some of which may be as much as 50 m high." },
        { type: 'p', text: "In some desert places, wind blows away all the loose sand, leaving only coarse pebbles and other small rocks behind. Such areas are known as desert pavement. Once desert pavement forms, almost no further wind erosion will occur." },
        { type: 'image-group', images: [
          { src: '/images/science/ch09/sand-dunes.jpg', caption: 'Sand dunes' },
          { src: '/images/science/ch09/desert-pavement.jpg', caption: 'Desert pavement' }
        ] }
      ],
      [
        { type: 'sidebar', text: "Do you know? Sand dunes are moved by the wind — some dunes travel as much as 30 m in a single year, which can create problems for people, since moving dunes have buried farms, towns, and forests. On the southern shore of Lake Michigan, strong winds blowing from the west have caused a series of large sand dunes to move inland. The dunes are slowly burying trees in an Indiana forest known as Indiana Dunes." },
        { type: 'image-group', images: [
          { src: '/images/science/ch09/indiana-dunes.jpg', caption: 'Indiana Dunes, Indiana' }
        ] },
        { type: 'p', text: "Sometimes wind erosion can affect a large region. During the 1930s there were several years of drought — a long period without rain — in the Great Plains of the United States. Many kinds of plants died, and the land became bare. Strong winds eroded the loose, dry topsoil, and the land affected by this drought and erosion became known as the Dust Bowl, named for the many dust storms that occurred — some so bad that they blocked out all sunlight during the day." },
        { type: 'image-group', images: [
          { src: '/images/science/ch09/dust-storm-1930s.jpg', caption: 'A dust storm during the 1930s' }
        ] }
      ],
      [
        { type: 'p', text: "There are ways for farmers to help prevent wind erosion. One way is to plant rows of trees or bushes, which act like fences or walls that block the force of the wind — something that does this is called a windbreak. Where fields are not being used, farmers can also plant ground cover: plants that hold soil in place and prevent erosion." },
        { type: 'image-group', images: [
          { src: '/images/science/ch09/windbreak.jpg', caption: 'A windbreak' }
        ] },
        { type: 'summary', text: "Weathering is all the processes that break rock into smaller pieces." },
        { type: 'summary', text: "Physical weathering breaks apart rock without changing its chemical makeup; chemical weathering breaks apart rock by changing its chemical makeup." },
        { type: 'summary', text: "Erosion is the movement of weathered rock and soil from one place to another." },
        { type: 'summary', text: "The agents of erosion are moving water, moving ice, and wind." },
        { type: 'summary', text: "Deposition is the dropping of sediments by the agents of erosion." }
      ],
      [
        {
          type: 'review',
          title: 'Reviewing the Chapter',
          sections: [
            {
              heading: 'Science Words',
              instructions: "Identify each term, and match the terms below to their definitions.",
              items: [
                { prompt: "It is formed when moving water cuts downward into a riverbed. It is a valley with steep sides. What is it?", answer: "canyon" },
                { prompt: "It is made of sediment deposited by the waters of a river. It forms a fan-shaped landmass at the mouth of a river. What is it?", answer: "delta" },
                { prompt: "The movement of weathered rock and soil from one place to another", answer: "erosion" },
                { prompt: "The dropping of sediments by moving water, moving ice, and wind", answer: "deposition" },
                { prompt: "The processes that break apart rock by changing its chemical makeup", answer: "chemical weathering" },
                { prompt: "The daily freezing and melting of water that causes large rocks to break up into small pieces", answer: "frost action" },
                { prompt: "Moving water, moving ice, and wind, together", answer: "agents of erosion" },
                { prompt: "A slow-moving mass of ice on land", answer: "glacier" },
                { prompt: "Materials dropped by moving water, moving ice, and wind", answer: "sediments" },
                { prompt: "A pile of sand deposited by wind", answer: "sand dune" },
                { prompt: "Trees or bushes that block the force of the wind", answer: "windbreak" },
                { prompt: "Water that comes from rain and melting snow and flows over the earth's surface", answer: "runoff" }
              ]
            }
          ]
        }
      ],
      [
        {
          type: 'review',
          title: 'Reviewing the Chapter',
          sections: [
            {
              heading: 'Understanding Ideas',
              instructions: "Sort each example, then identify the agent of erosion involved.",
              items: [
                { prompt: "Plants growing in the crack of a rock split the rock — physical or chemical weathering?", answer: "Physical weathering" },
                { prompt: "Mosses and lichens produce acids that dissolve rock — physical or chemical weathering?", answer: "Chemical weathering" },
                { prompt: "Ocean waves pound rock cliffs and crack them — physical or chemical weathering?", answer: "Physical weathering" },
                { prompt: "Carbonic acid dissolves limestone, forming caves — physical or chemical weathering?", answer: "Chemical weathering" },
                { prompt: "Iron oxide forms and breaks off rock — physical or chemical weathering?", answer: "Chemical weathering" },
                { prompt: "A sand dune: erosion or deposition, and by which agent?", answer: "Deposition, by wind" },
                { prompt: "A canyon: erosion or deposition, and by which agent?", answer: "Erosion, by moving water" },
                { prompt: "A U-shaped valley: erosion or deposition, and by which agent?", answer: "Erosion, by moving ice" },
                { prompt: "A delta: erosion or deposition, and by which agent?", answer: "Deposition, by moving water" },
                { prompt: "A hilly ridge of rocky material: erosion or deposition, and by which agent?", answer: "Deposition, by moving ice" },
                { prompt: "A dust storm: erosion or deposition, and by which agent?", answer: "Erosion, by wind" }
              ]
            },
            {
              heading: 'Using Ideas',
              items: [
                { prompt: "Look in your neighborhood for examples of physical weathering, chemical weathering, erosion, and deposition. List the examples you find and identify which process each one is.", answer: "Look for cracked sidewalks (frost action), rusted metal or mossy stone (chemical weathering), riverbanks or gullies (erosion), and sandbars or silt piles (deposition)." },
                { prompt: "Design an experiment to show one way that erosion of soil by wind or water can be prevented.", answer: "For example, plant grass on two identical trays of loose soil, leave one bare, then apply the same amount of water or fan-driven wind to both and compare how much soil washes or blows away." }
              ]
            }
          ]
        }
      ]
    ]
  },
  "Ch.10 · Cleaning Up the Earth": {
    title: "Cleaning Up the Earth",
    pages: [
      [
        { type: 'heading', text: 'Chapter 10 · Cleaning Up the Earth' },
        { type: 'p', text: "Imagine that you are living 100 years ago. The air today is not as clean as it was then. This is an industrial age — thousands of factories have been built during the past 100 years, and in many areas, highways have become crowded with cars and trucks." },
        { type: 'p', text: "Each year huge amounts of wastes pour into the air, water, and soil. In this chapter you will learn about the sources of these wastes, how they affect the air, water, and land, and what is being done to control them." },
        { type: 'image-group', images: [
          { src: '/images/science/ch10/traffic-jam-street.jpg', caption: 'City street crowded with traffic' }
        ] }
      ],
      [
        { type: 'heading', text: 'Natural Resources' },
        { type: 'p', text: "Why is there a shortage of some resources? Look around at the things you use. You use paper, pencils, and books. You walk on the land, drink the water, and breathe the air. All these things are natural resources or come from natural resources. A natural resource is a useful material found in or on the earth. The paper, pencils, and books you use come from trees, and so are all other plants. Air, water, and land are also valuable natural resources. Can you name other natural resources?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch10/uses-of-trees-diagram.jpg', caption: 'Uses of trees' }
        ] }
      ],
      [
        { type: 'p', text: "Some resources can be replaced after they are used. For example, as trees are cut down for wood, new trees can be planted. A tree is a renewable resource — a resource that can be replaced after it is used. Air, water, and land are also renewable resources." },
        { type: 'p', text: "Since some resources can be renewed, there should be no shortages — there should be a large enough supply for everyone. But the supply has become smaller because of pollution. Pollution is the presence of waste or other unwanted materials in a resource. The substances that cause pollution are called pollutants. Pollution of air, water, and land has reduced the useful supply of these resources." },
        { type: 'image-group', images: [
          { src: '/images/science/ch10/littered-forest.jpg', caption: 'Littered forest' },
          { src: '/images/science/ch10/planting-tree-seedlings.jpg', caption: 'Planting tree seedlings' }
        ] }
      ],
      [
        { type: 'heading', text: 'Air Pollution' },
        { type: 'p', text: "What causes air pollution? Pure air is made up mostly of nitrogen (78%) and oxygen (21%), along with small amounts of argon, carbon dioxide, and other gases. The air you breathe often contains unwanted substances — when these are added to pure air, air pollution results. Most pollutants in air come from cars, trucks, homes, factories, and power plants, and some come from burning leaves and garbage. Some pollutants occur in nature too, such as fumes and smoke from forest fires and volcanoes." },
        { type: 'p', text: "Cars, trucks, homes, and factories burn fossil fuels — coal, oil, and gas — for energy. Over the past 100 years, the use of fossil fuels has increased greatly. Millions of cars and trucks are now on the roads, and there are many more factories, so more fossil fuels are burned and more waste products are given off into the air. Carbon dioxide and carbon monoxide are examples of waste products given off by burning fuels. Smoke also carries soot, ash, and dust into the air — these light particles may float for a long time, and winds can carry them far from the source of pollution." },
        { type: 'image-group', images: [
          { src: '/images/science/ch10/parts-of-air-chart.jpg', caption: 'The parts of air' },
          { src: '/images/science/ch10/traffic-on-bridge.jpg', caption: 'Traffic on bridge' },
          { src: '/images/science/ch10/coal-burning-power-plant.jpg', caption: 'Coal-burning power plant' }
        ] }
      ],
      [
        { type: 'p', text: "In parts of the United States and Canada, there is much concern over acid rain. Its major cause is the burning of fossil fuels, though volcanoes and forest fires add to it too. When fuels burn and volcanoes erupt, chemical wastes enter the air. Water vapor in the air combines with these chemicals to form weak acids, which fall to the ground as snow or rain — this is called acid rain." },
        { type: 'p', text: "Acid rain falls on the land and into lakes and streams. When it reaches them, it increases the amount of acid in the water, which can kill fish and other living things. Acid rain also breaks down minerals in the soil, robbing plants of important materials for growth, so some plants cannot live where there is acid rain. Acid rain even damages buildings, water systems, and statues. Scientists know the causes of acid rain, and must find a way to stop it from forming." },
        { type: 'image-group', images: [
          { src: '/images/science/ch10/statue-acid-rain-damage.jpg', caption: 'Statue damaged by acid rain' }
        ] }
      ],
      [
        { type: 'p', text: "Another kind of pollution, called smog, occurs in towns and cities with many factories, cars, and trucks. Most smog is a mixture of smoke and fog. It occurs when calm, moist air near the ground is trapped and does not move away — the longer the air stays in one place, the worse the pollution becomes. Smog can be harmful, and can even cause death. In certain cities, smog is not as common as it once was, because those cities have worked to control air pollution." },
        { type: 'p', text: "Today, people are aware that air pollution is a big problem, and there are many ways to control it. Since cars and trucks cause much of the pollution, people can walk, ride bicycles, or take trains and buses, or join car pools — this means fewer cars and trucks on the roads." },
        { type: 'image-group', images: [
          { src: '/images/science/ch10/nyc-in-smog.jpg', caption: 'New York City in smog' },
          { src: '/images/science/ch10/nyc-clear-day.jpg', caption: 'New York City on a clear day' },
          { src: '/images/science/ch10/using-trains-and-buses.jpg', caption: 'Using trains and buses' }
        ] }
      ],
      [
        { type: 'p', text: "Today, new cars must have devices that trap or burn up harmful gases in exhaust, and most new cars are built to burn only unleaded gasoline, since burning leaded gasoline releases harmful substances. Factories are required to use special devices in their smokestacks — these use an electrical charge to attract particles from smoke, and also remove harmful waste gases." },
        { type: 'p', text: "An important law, the Clean Air Act, was passed in 1970. It limits the amount of pollution allowed in the air — when levels get too high, factories are ordered to stop burning certain fuels, and can resume once pollution is reduced to a safe level." },
        { type: 'image-group', images: [
          { src: '/images/science/ch10/checking-car-exhaust.jpg', caption: 'Checking car exhaust' },
          { src: '/images/science/ch10/checking-air-pollutants.jpg', caption: 'Checking air pollutants in air' }
        ] }
      ],
      [
        { type: 'activity', text: "Are there solid particles in the air you breathe? Materials: large empty coffee can, 1 m of wire, scissors, white paper, glue, petroleum jelly, hand lens. Procedure: A. Wrap wire once around the can and twist it into a handle. B. Cut a round piece of white paper a little smaller than the bottom of the can and glue it inside. C. Spread petroleum jelly over the paper — why do you think this is needed? D. Hang the can outdoors in an open area, such as on a clothesline or fence. E. After 1 or 2 weeks, bring the can indoors, remove the paper, and examine it with a hand lens — did you find anything on the jelly-covered paper? Compare your findings with classmates'. Conclusion: Are there solid particles in the air you breathe? If so, where might they come from? Using science ideas: Describe an activity that would show the difference between pollution in the city and pollution in the country." },
        { type: 'image-group', images: [
          { src: '/images/science/ch10/activity-can-wire-handle.jpg', caption: 'Making the coffee-can air trap' },
          { src: '/images/science/ch10/activity-cutting-paper-circle.jpg', caption: 'Cutting the paper circle' },
          { src: '/images/science/ch10/activity-examining-filter-paper.jpg', caption: 'Examining the paper for particles' }
        ] }
      ],
      [
        { type: 'heading', text: 'Water Pollution' },
        { type: 'p', text: "What causes water pollution? Most of the water on the earth is in the oceans, but because of the salt in it, this water cannot be used for drinking, industry, or farming. People must depend on fresh water for their needs, which mostly comes from under the ground or from lakes, rivers, and streams — so it is important to take care of the limited supply of water." },
        { type: 'p', text: "Some studies show that each person in the United States uses nearly 400 L of water a day, and industries may use billions of liters more. Large amounts are also needed to water farmland. If the freshwater supply is polluted, there is less water left for people, farms, industries, fishing, and swimming." },
        { type: 'image-group', images: [
          { src: '/images/science/ch10/watering-crops.jpg', caption: 'Watering crops' },
          { src: '/images/science/ch10/boy-drinking-fountain.jpg', caption: 'Drinking clean water' },
          { src: '/images/science/ch10/polluted-water-warning-sign.jpg', caption: 'Warning sign: polluted water' }
        ] }
      ],
      [
        { type: 'p', text: "Water can be polluted when sewage is dumped into it. Sewage contains waste from sinks, toilets, and showers, and can cause disease in people who drink polluted water. Most cities have sewage-treatment plants that remove most pollutants: first, sewage passes through screens that filter out large objects; then it passes to a settling tank, where light materials float to the top to be skimmed off and heavier materials sink and are removed; the water is then pumped through a filter and a second settling tank, and finally treated with the chemical chlorine, which kills certain harmful living things, before being returned to lakes, streams, and rivers." },
        { type: 'image-group', images: [
          { src: '/images/science/ch10/sewage-treatment-diagram.jpg', caption: 'How a sewage-treatment plant works' },
          { src: '/images/science/ch10/sewage-treatment-plant.jpg', caption: 'Sewage treatment plant' }
        ] }
      ],
      [
        { type: 'p', text: "Water can also be polluted by fertilizers and chemical sprays. Many farmers use chemical fertilizers — substances that help plants grow — and chemical sprays to kill insects and weeds that damage crops. Chemicals from fertilizers and sprays soak into the soil when it rains, and in time water carrying these chemicals drains into streams and rivers, and eventually into lakes and oceans." },
        { type: 'p', text: "Fertilizers entering the water increase the growth of small plants called algae. When the algae die, they pile up on the bottoms of ponds and lakes, and as they decay they use up oxygen from the water. As the oxygen supply decreases, fish and other animals that get oxygen from the water may die." },
        { type: 'p', text: "Chemicals from insect and weed sprays can poison fish and other living things in the water, and can even affect living things near the water through a food chain — a small fish may take in poison from eating small plants, a larger fish eats the small fish, and a bird eats the larger fish, so poisons build up in the bird until it eventually dies from the poison." },
        { type: 'image-group', images: [
          { src: '/images/science/ch10/fertilizer-runoff-diagram.jpg', caption: 'Effect of fertilizer runoff' },
          { src: '/images/science/ch10/algae-covering-water.jpg', caption: 'Algae covering water' },
          { src: '/images/science/ch10/poison-in-food-chain-diagram.jpg', caption: 'Poison in the food chain' }
        ] }
      ],
      [
        { type: 'p', text: "Pollution from fertilizers and insect sprays can be reduced by using less of these chemicals. Sometimes farmers plant shrubs and grasses near water to help prevent soil erosion, so that soil carrying chemicals will not enter the water." },
        { type: 'p', text: "Industries can also pollute water — when making products, they may dump liquid or solid wastes into rivers and lakes, poisoning the water and making it unsafe for drinking and swimming. Many industries have built their own waste-treatment plants to remove harmful substances before water enters rivers, lakes, or streams." },
        { type: 'image-group', images: [
          { src: '/images/science/ch10/taking-water-samples.jpg', caption: 'Taking water samples' }
        ] }
      ],
      [
        { type: 'p', text: "Some industries also release hot water into streams and lakes. The dumping of heated material into water is called thermal pollution. Hot water cannot hold as much oxygen as cold water, so with lower amounts of oxygen, certain plants and animals cannot live there." },
        { type: 'p', text: "There are ways for industries and power plants to stop thermal pollution. Instead of releasing heated water into lakes and rivers, the heat can be released into the air — some nuclear power plants have large cooling towers, where hot water from the plant is pumped through coiled pipes while cool air is blown over them. The now-heated air is released through the top of the tower, and the cooled water is returned to the power plant for reuse." },
        { type: 'image-group', images: [
          { src: '/images/science/ch10/cooling-tower-diagram.jpg', caption: 'How a cooling tower works' },
          { src: '/images/science/ch10/cooling-tower-photo.jpg', caption: 'Cooling tower' }
        ] }
      ],
      [
        { type: 'p', text: "In recent years a new problem has developed: oil spills. Huge ships carry oil across the oceans, and sometimes their tanks leak oil into the ocean. Another source of oil spills is offshore drilling. Long stretches of beach have been damaged because of oil spills from offshore wells, and fish and other wildlife have been killed by them." },
        { type: 'sidebar', text: "Do you know? Several years ago, a disaster occurred off the coast of England: the merchant ship Torrey Canyon, carrying thousands of metric tons of crude oil, crashed into rocks and began spilling oil. Ships sent to help dumped hundreds of metric tons of detergent into the water to try to break up the spreading oil slick, but it did not break up. Workers tried to burn the floating oil, but the fire spread far across the water and the oil kept spreading. Soon it reached the nearby French coast, where chicken wire and straw were laid over oyster beds to try to keep the oil out — still, it kept spreading. Several weeks passed before the oil could be controlled. By then, 192 km of British beaches had been ruined, and thousands of oysters, mussels, birds, fish, and plants had died." },
        { type: 'image-group', images: [
          { src: '/images/science/ch10/bird-rescued-oil-spill.jpg', caption: 'Bird rescued from oil spill' },
          { src: '/images/science/ch10/oil-spill-cleanup.jpg', caption: 'Cleanup after oil spill' },
          { src: '/images/science/ch10/torrey-canyon-oil-spill.jpg', caption: 'The wrecked tanker Torrey Canyon' }
        ] }
      ],
      [
        { type: 'activity', text: "Does dilution help to reduce water pollution? Materials: graduate, 2-L plastic soft-drink bottle, clear plastic pill bottle, red or blue food coloring, white paper, water, 500-mL beaker. Procedure: A. Measure 10 mL of water into the pill bottle. B. Add 1 drop of food coloring, swirl to mix, and observe the color against white paper. C. Pour 1,000 mL of water into the soft-drink bottle. D. Add 1 drop of food coloring, swirl to mix, and observe the color against white paper — is it deeper than in the pill bottle? E. Imagine the food coloring is a harmful pollutant, the pill bottle a small pond, and the soft-drink bottle a lake — will the pollutant do more harm in the pond or the lake? Conclusion: What is the difference between the effect of the food coloring in each bottle? Compare the effect of the same amount of pollution on a small versus a large body of water." },
        { type: 'image-group', images: [
          { src: '/images/science/ch10/activity-measuring-water.jpg', caption: 'Measuring water with a graduate' },
          { src: '/images/science/ch10/activity-adding-food-coloring.jpg', caption: 'Adding food coloring to the pill bottle' },
          { src: '/images/science/ch10/activity-pouring-into-bottle.jpg', caption: 'Pouring water into the soft-drink bottle' }
        ] }
      ],
      [
        { type: 'heading', text: 'Land Pollution' },
        { type: 'p', text: "What causes land pollution? There are several things that threaten the soil. One of the most serious is soil erosion — if it is not controlled, valuable land can be lost forever." },
        { type: 'p', text: "Soil can be polluted by toxic wastes — wastes that are poisonous. These wastes may be produced by certain industries and buried in the soil. Even toxic wastes stored in drums can reach the soil if the drums leak, and the chemicals can stay in the soil a long time, harming or killing living things and even seeping into water supplies. Governments and industries are working to clean up chemical dump sites, and new ways to store and get rid of chemical wastes are being studied." },
        { type: 'image-group', images: [
          { src: '/images/science/ch10/plants-prevent-erosion.jpg', caption: 'Plants that prevent erosion' },
          { src: '/images/science/ch10/drums-of-toxic-wastes.jpg', caption: 'Drums of toxic wastes' },
          { src: '/images/science/ch10/checking-leaking-drums.jpg', caption: 'Checking leaking drums' }
        ] }
      ],
      [
        { type: 'p', text: "One of the ugliest kinds of pollution is litter — on city streets, country roads, and in fields and forests. Some forms of litter are more of a problem than others. Paper, cloth, cardboard, and wood are biodegradable materials, meaning they decay, or are broken down by living things. Small organisms in the soil break down biodegradable materials as they use them for food, and these materials become part of the soil." },
        { type: 'p', text: "But not all materials are biodegradable. Plastic and aluminum are not broken down by living things — these are called nonbiodegradable materials, and they litter the land long after they have been thrown away." },
        { type: 'image-group', images: [
          { src: '/images/science/ch10/no-litter-fine-sign.jpg', caption: 'No Litter — $200 Fine sign' }
        ] }
      ],
      [
        { type: 'activity', text: "Which materials are biodegradable? Collect several items you might throw out — for example, a cardboard cereal box, an aluminum can, and table scraps. You will also need a shallow pan and enough soil to fill it. Place a thin layer of soil in the pan, place the items over it with space between each one, then cover with more soil and moisten it with water. Place the pan outdoors for a week, then bring it inside and dig out the items. Have any changed? Have any stayed the same?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch10/sorting-biodegradable-items.jpg', caption: 'Testing which materials are biodegradable' }
        ] }
      ],
      [
        { type: 'p', text: "Laws have been passed in many areas to help stop litter. Most states fine people who are caught littering, and some states have even stopped the sale of throw-away bottles." },
        { type: 'p', text: "Pollution of air, water, and land is a problem that affects all people — everyone must use the air, water, and land, and everyone can help clean up the earth." }
      ],
      [
        { type: 'summary', text: "A renewable resource is one that can be replaced after it is used." },
        { type: 'summary', text: "Pollution is the presence of waste or other unwanted materials in a resource." },
        { type: 'summary', text: "The major cause of air pollution is the burning of fossil fuels by cars, trucks, homes, and factories." },
        { type: 'summary', text: "Air pollution can be controlled by the use of unleaded gas and antipollution devices on cars and smokestacks." },
        { type: 'summary', text: "Acid rain is rain with weak acids dissolved in it; it can harm or kill plants and animals in streams, lakes, and rivers." },
        { type: 'summary', text: "The major causes of water pollution are the dumping of sewage, chemicals, and heated material into water." },
        { type: 'summary', text: "The major causes of land pollution are careless dumping of litter, sewage, and harmful chemicals." },
        { type: 'summary', text: "Laws are helping to control pollution of air, water, and land." }
      ],
      [
        { type: 'image-group', images: [
          { src: '/images/science/ch10/pollution-scene-drawing.jpg', caption: 'A scene showing several examples of pollution' }
        ] },
        {
          type: 'review',
          title: 'Reviewing the Chapter',
          sections: [
            {
              heading: 'Science Words',
              instructions: "Match each definition to its term.",
              items: [
                { prompt: "Mixture of smoke and fog", answer: "smog" },
                { prompt: "Able to decay or break down", answer: "biodegradable" },
                { prompt: "Substance that improves the growth of plants", answer: "fertilizer" },
                { prompt: "Poisonous", answer: "toxic" },
                { prompt: "Substances that cause pollution", answer: "pollutants" },
                { prompt: "Wastes from sinks, toilets, and showers", answer: "sewage" },
                { prompt: "Dumping hot substances into water", answer: "thermal pollution" },
                { prompt: "Presence of waste or other unwanted materials in a resource", answer: "pollution" },
                { prompt: "Useful material found in or on the earth", answer: "natural resource" },
                { prompt: "Resource that can be replaced as it is used", answer: "renewable" }
              ]
            },
            {
              heading: 'Understanding Ideas',
              instructions: "Identify each item, and for the cause/effect pairs, say which sentence is the cause and which is the effect.",
              items: [
                { prompt: "The drawing above shows at least six examples of pollution. Describe each of the types of pollution shown.", answer: "Examples in the scene include: smoke from factory smokestacks (air pollution), exhaust from trucks and cars (air pollution), a pile of junk/litter dumped near the road (land pollution), fertilizer or waste runoff from the farm into the stream (water pollution), farm animals near polluted runoff, and litter left at the picnic table by the river (land/water pollution)." },
                { prompt: "It could be plastic. It could be aluminum. It does not decay. What is it?", answer: "A nonbiodegradable material" },
                { prompt: "It can take the nose off a statue. It can kill the fish in a lake. It can travel great distances. It falls from clouds. What is it?", answer: "Acid rain" },
                { prompt: "\"A picnic area is littered with nonbiodegradable materials\" vs. \"A family leaves aluminum cans and plastic bags at a picnic area\" — which is the cause, which is the effect?", answer: "The family leaving the litter is the cause; the littered picnic area is the effect." },
                { prompt: "\"Fertilizer runoff pollutes a stream\" vs. \"Algae cover the surface of a stream\" — which is the cause, which is the effect?", answer: "The fertilizer runoff is the cause; the algae covering the stream is the effect." },
                { prompt: "\"A city is covered with smog\" vs. \"Calm, moist air becomes trapped near the ground and does not move\" — which is the cause, which is the effect?", answer: "The trapped, calm, moist air is the cause; the smog is the effect." }
              ]
            },
            {
              heading: 'Using Ideas',
              items: [
                { prompt: "Think of three ways that you and your family pollute the air, water, and land. Suggest three ways you can help stop this pollution.", answer: "For example: driving a car (air) — walk or carpool instead; letting the tap run (water) — turn it off when not needed; throwing away plastic (land) — recycle or reuse it instead." }
              ]
            }
          ]
        }
      ]
    ]
  },
  "Ch.11 · Changes in the Weather": {
    title: "Changes in the Weather",
    pages: [
      [
        { type: 'heading', text: 'Chapter 11 · Changes in the Weather' },
        { type: 'p', text: "People often talk about the condition of the atmosphere in a place. You may talk about it every day. This popular topic is the weather. What is the weather like in the picture?" },
        { type: 'p', text: "When people talk about weather, they usually discuss the changing conditions of the atmosphere. The atmosphere is the layer of air that surrounds the earth. In just a few hours the weather in a place may be very different, because conditions in the atmosphere can change rapidly." },
        { type: 'p', text: "In this chapter you will learn what causes weather and why weather changes. You will also learn about some unusual kinds of weather." },
        { type: 'image-group', images: [
          { src: '/images/science/ch11/sky-tree-title.jpg', caption: 'The sky at dusk' }
        ] }
      ],
      [
        { type: 'heading', text: 'How Weather Begins' },
        { type: 'p', text: "What causes uneven heating of the atmosphere? How does weather begin? It begins with energy from the sun. You have learned that energy from the sun is called solar energy. It is this energy that causes weather." },
        { type: 'p', text: "What happens to the sun's energy as it enters the atmosphere? Some of it is reflected, or bounced back, into space by clouds, dust, and air particles. A small amount is absorbed, or {{taken in}}, by the atmosphere. Absorbed solar energy changes to heat energy. So only a small amount of the atmosphere is heated directly by the sun." },
        { type: 'p', text: "About half of the sun's energy that enters the atmosphere passes through the air and strikes the earth's surface. Some of this energy is absorbed and changed to heat. This warms the earth's surface. Heat from the earth's surface then warms the air above it. You can see that the atmosphere gets most of its energy secondhand." },
        { type: 'image-group', images: [
          { src: '/images/science/ch11/hazy-sunset.jpg', caption: 'A hazy sunset' },
          { src: '/images/science/ch11/solar-energy-diagram.jpg', caption: 'What happens to solar energy that reaches the atmosphere' }
        ] }
      ],
      [
        { type: 'p', text: "Weather is caused by the uneven heating of the atmosphere. The air is heated unevenly because the earth's surface is heated unevenly. Why does this happen? There are several reasons. One reason is the round shape of the earth. It causes different parts of the earth to receive different amounts of solar energy." },
        { type: 'p', text: "The rays of the sun strike the equator directly. When the sun's rays strike the earth directly, the earth's surface is heated the most. Look at the areas north and south of the equator. In these places the sun's rays strike the earth's surface at a slant. When the rays strike the surface at a slant, the surface is heated less. You can see why the earth is heated more at the equator than at the poles." },
        { type: 'image-group', images: [
          { src: '/images/science/ch11/sun-rays-equator-diagram.jpg', caption: 'The sun\'s rays strike the equator directly and the areas near the poles at a slant' }
        ] }
      ],
      [
        { type: 'p', text: "Another reason that the earth's surface is heated unevenly can be seen in pictures taken from a plane. Such pictures show places covered by white snow and dark soil. They show green fields and forests, blue water, and red deserts. These different-colored surfaces absorb different amounts of energy from the sun, and the amount of solar energy that they reflect is also different." },
        { type: 'p', text: "Light-colored surfaces reflect much of the sun's energy that strikes them. Dark-colored surfaces absorb much of the sun's energy that strikes them. Which gets warmer, a light-colored surface or a dark-colored surface? What color clothing is best to wear on a hot summer day? Why?" },
        { type: 'p', text: "The more solar energy a surface absorbs, the more the surface warms the air above it. Do you think that snow reflects, or absorbs, most of the solar energy that strikes it? Would dark soil absorb, or reflect, more solar energy?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch11/ocean-waves-aerial.jpg', caption: 'Ocean water reflects much of the sun\'s energy' },
          { src: '/images/science/ch11/aerial-fields-forest.jpg', caption: 'An aerial view of fields and forest' },
          { src: '/images/science/ch11/desert-cliffs.jpg', caption: 'Dark desert soil absorbs much of the sun\'s energy' }
        ] }
      ],
      [
        { type: 'p', text: "There is another factor that causes the earth's surface to heat unevenly. About three-fourths of the earth is covered by water. Water and land areas absorb solar energy at different rates." },
        { type: 'p', text: "Land and water heat up at different rates. During the day, the sun shines and the land heats up faster than the water. So the air over the land becomes warmer than the air over the water. While the land heats up faster than the water, it also loses heat faster. At night, when there is no sunlight, the warm land cools quickly, so the air over the land becomes cooler. The water holds heat and stays warm at night." },
        { type: 'p', text: "Very little heat from the earth's surface and atmosphere escapes into space. This is because clouds, dust, and air particles trap the heat. This is an example of the greenhouse effect. On a large scale, the greenhouse effect keeps the earth warm." },
        { type: 'image-group', images: [
          { src: '/images/science/ch11/forest-lake.jpg', caption: 'A forest lake — land heats and cools faster than water' }
        ] }
      ],
      [
        { type: 'activity', text: "How do materials differ in the way they heat and cool? Materials: 6 paper cups / scissors / dark-colored soil / light-colored sand / 3 thermometers / lamp. Procedure: A. Cut the tops off three paper cups so that the remaining part is about 4 cm deep. Fill each cup with one of the following materials: dark-colored soil, light-colored sand, and water. B. Place the cups together. Put a thermometer into each cup, with the bulb covered by about 0.5 cm of sand, soil, or water. C. Copy a chart and record the starting temperature in each cup. 1. Do you think the materials will heat at different rates? Explain your answer. D. Place a lamp so its bulb is about 15 cm from the tops of the cups. Turn on the lamp. After 5 minutes, read and record the temperature in each cup. 2. Which material was heated the most? Which was heated the least? 3. If you turn off the lamp, do you think the materials will cool at different rates? Explain your answer. E. Turn off the lamp. After 5 minutes, read and record the temperature in each cup again. 4. Which material cooled the least? The most? Conclusion: How does this activity help explain the uneven heating of the earth?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch11/activity-mixing-cups.jpg', caption: 'Filling cups with soil, sand, and water for the heating and cooling activity' },
          { src: '/images/science/ch11/activity-lamp-cups.jpg', caption: 'Testing how the materials heat under a lamp' }
        ] }
      ],
      [
        { type: 'heading', text: 'Air Pressure and Winds' },
        { type: 'p', text: "What causes winds? Air is {{made up of}} particles of matter. Like all matter, air has mass. The mass of the atmosphere above the earth pushes down on the surface. This causes air pressure. The pressure of air changes from day to day and from place to place. The temperature of the air affects the pressure of the air." },
        { type: 'p', text: "When air is heated, it expands. This means that the particles in air move farther apart. When this happens, the air becomes less dense, so there are fewer air particles over a certain part of the earth's surface. This lowers the air pressure in that place. Usually, when temperature increases, air pressure decreases." },
        { type: 'image-group', images: [
          { src: '/images/science/ch11/air-pressure-before-after-heating.jpg', caption: 'Air before heating (higher pressure) and after heating (lower pressure)' },
          { src: '/images/science/ch11/warm-cold-air-balance.jpg', caption: 'Equal volumes of warm air and cold air' }
        ] }
      ],
      [
        { type: 'p', text: "The amount of water in the air also affects the air pressure. The more water vapor there is in air, the lower the air pressure. This may seem strange, but keep in mind that water vapor is a gas, and water vapor is less dense than air. So 1 L of water vapor has less mass than 1 L of air. Usually, the more water vapor in air, the lower the air pressure." },
        { type: 'p', text: "Differences in air pressure cause air to move. This movement of air is wind. Winds may be gentle breezes, or they may be strong gusts. The greater the difference in air pressure from one place to another, the greater the strength of the wind. Air always moves from regions of high pressure, called highs, to regions of low pressure, called lows." },
        { type: 'image-group', images: [
          { src: '/images/science/ch11/water-vapor-air-balance.jpg', caption: 'Water vapor is less dense than air' }
        ] }
      ],
      [
        { type: 'p', text: "There are different groups of winds. Some winds are local winds. Local winds are caused by local differences in pressure. For example, there are differences in air pressure over land and water. These differences cause winds to change direction along coastal regions." },
        { type: 'p', text: "During the day the air over the land is heated more than the air over the water, so the pressure of the air over the land is lower. The cooler, high-pressure air over the water blows toward the land. It moves under the warm, low-pressure air and pushes it up. This movement of air from water to land is called a sea breeze. On a summer day at the beach, you can often feel cool breezes blowing from the sea to the land." },
        { type: 'image-group', images: [
          { src: '/images/science/ch11/sea-breeze-diagram.jpg', caption: 'A sea breeze: cool, high-pressure air moves from water to land' }
        ] }
      ],
      [
        { type: 'p', text: "At night the air over the land becomes cooler than the air over the water, so the pressure of the air over the land is higher. This air blows toward the water. It pushes up the warm, low-pressure air over the water. This movement of air from land to water is called a land breeze." },
        { type: 'p', text: "Sea and land breezes are local winds, but the earth also has large regions of high and low pressure. Air moves from the high-pressure regions to the low-pressure regions. This movement of air, along with the rotation of the earth, creates wind belts that circle the earth, called global winds." },
        { type: 'p', text: "The global winds in each belt blow steadily in one direction. The winds are named for the direction from which they come. Most of the United States lies within a global wind belt called the westerlies, which is why much of the weather in the United States moves from west to east across the country." },
        { type: 'image-group', images: [
          { src: '/images/science/ch11/land-breeze-diagram.jpg', caption: 'A land breeze: cool, high-pressure air moves from land to water' },
          { src: '/images/science/ch11/global-wind-belts.jpg', caption: 'Global wind belts circling the earth' }
        ] }
      ],
      [
        { type: 'heading', text: 'Air Masses and Weather' },
        { type: 'p', text: "Have you ever noticed how hot and humid it can be on a summer day, and then, the very next day, the air is cool and dry? This type of change in the weather is caused by the movement of air masses. An air mass is a large body of air that has about the same temperature and moisture throughout. When air stays over a region of the earth for a long time, the air {{takes on}} the properties of that region." },
        { type: 'p', text: "There are four basic kinds of air masses. Air masses are named for their temperature and for the amount of moisture they contain. The kind of air mass that forms depends on where it forms. Cold, wet air masses form over cold ocean waters. Cold, dry air masses form over cold land areas near the poles, regions usually covered by snow and ice. Warm, wet air masses form over oceans near the equator. Warm, dry air masses form over warm land areas." },
        { type: 'image-group', images: [
          { src: '/images/science/ch11/iceberg-polar-bear.jpg', caption: 'A cold, wet air mass forms over icy polar waters' },
          { src: '/images/science/ch11/glacier-aerial.jpg', caption: 'A cold, dry air mass forms over snow and ice near the poles' }
        ] }
      ],
      [
        { type: 'p', text: "Six major areas of North America produce the air masses that affect the continent's weather. During winter a cold, dry air mass will bring clear but very cold weather. In summer a warm, wet air mass will mean hot, humid weather. How long any kind of weather remains in an area depends on how fast an air mass is moving." },
        { type: 'heading', text: 'When Air Masses Meet' },
        { type: 'p', text: "How do cold fronts and warm fronts differ? You have learned that air masses move. As one air mass moves away from a region, another air mass moves in. The place where two air masses meet is called a front. Changes in weather take place at a front." },
        { type: 'image-group', images: [
          { src: '/images/science/ch11/desert-cactus.jpg', caption: 'A warm, dry air mass forms over desert land' },
          { src: '/images/science/ch11/tropical-island.jpg', caption: 'A warm, wet air mass forms over oceans near the equator' },
          { src: '/images/science/ch11/major-air-masses-map.jpg', caption: 'Major air masses of North America' }
        ] }
      ],
      [
        { type: 'p', text: "Fronts are named for the kind of air mass moving into a region. When a cold air mass moves into a warmer air mass, the place where these air masses meet is a cold front." },
        { type: 'p', text: "As the dense, cold air mass moves forward, it remains close to the ground and moves under the less dense, warm air mass. This forces the warm air to rise quite rapidly. As the warm air is forced up, it cools. Water vapor in the air condenses, changing to tiny drops of liquid water. These drops form clouds. The clouds that form along a cold front are often dark, towering clouds." },
        { type: 'image-group', images: [
          { src: '/images/science/ch11/cold-front-diagram.jpg', caption: 'A cold front — cold air pushes under warm air, forcing it up rapidly' }
        ] }
      ],
      [
        { type: 'p', text: "Brief but heavy rain may occur along cold fronts, and wind speed may increase a great deal. Thunderstorms are common along cold fronts. Sometimes very wet, warm air is pushed up by a cold front, forming a line of thunderstorms ahead of the front. Under certain conditions, tornadoes can form along with a line of thunderstorms. A tornado is the most violent kind of storm." },
        { type: 'p', text: "Tornadoes are narrow, funnel-shaped spirals of air. Wind speeds in a tornado may be as much as 800 km/h. Tornadoes hang from the bottom of storm clouds and move in a twisting path. From time to time, they touch the ground. When they do, they can destroy buildings, uproot trees, and carry cars many meters through the air." },
        { type: 'image-group', images: [
          { src: '/images/science/ch11/thunderstorm-lightning.jpg', caption: 'A thunderstorm along a cold front' },
          { src: '/images/science/ch11/tornado-photo.jpg', caption: 'A tornado — the most violent kind of storm' }
        ] }
      ],
      [
        { type: 'p', text: "During winter, a blizzard may form along a cold front. Blizzards occur when there are large differences in pressure between two air masses. Blizzards are snowstorms in which temperatures are below freezing and winds are very high. After a cold front passes, the temperature in the region drops. The sky usually clears and fluffy white clouds may be seen. Why does the temperature drop after a cold front passes?" },
        { type: 'p', text: "A warm front is the place where a moving warm air mass meets a colder air mass. The dense, cold air mass remains close to the ground. As the less dense, warm air mass moves forward, it slowly slides up and over the cold air mass. As it slowly rises, the warm air cools. Water vapor in the warm air condenses, and high, thin, feathery clouds may form — a sign that a warm front is coming." },
        { type: 'p', text: "A warm front passes through a region more slowly than a cold front does. As the warm front moves, thick low clouds may form ahead of it, and steady, light rain may fall for a day or more. When the warm front passes, the temperature rises and the sky slowly clears." },
        { type: 'image-group', images: [
          { src: '/images/science/ch11/blizzard-photo.jpg', caption: 'A blizzard buries a street in snow' },
          { src: '/images/science/ch11/warm-front-diagram.jpg', caption: 'A warm front — warm air slowly rises up and over cold air' }
        ] }
      ],
      [
        { type: 'sidebar', text: "Do you know? Sometimes changes in weather during a single day can be extreme. The greatest daily temperature change ever recorded occurred in Browning, Montana. On the afternoon of January 23, 1916, the temperature was 6.7°C. During the night it dropped to -49°C — a difference of almost 56°C! The highest temperature ever recorded was in Libya: on September 13, 1922, the temperature reached 58°C. The lowest recorded temperature was in Antarctica on July 31, 1983, at -89.2°C. Other records include 1,946 mm of rain that fell in a single 24-hour period on an island in the Indian Ocean, and the greatest recorded snowfall during a 24-hour period, 193 cm, at Silver Lake, Colorado." }
      ],
      [
        { type: 'activity', text: "How does the weather change? Materials: thermometer / barometer. Procedure: A. Scientists observe changes in the weather to help them better understand and predict them — you can too. Make a chart with columns for the day, the temperature, the amount of clouds, the air pressure, wind direction, and the weather conditions. B. Write what day it is in your chart. C. Read a thermometer that is in a shady place outside, and record the temperature. D. Read a barometer, and note in your chart whether the air pressure is rising, falling, or steady since the last reading. E. Look at the cloud cover and indicate whether it is clear, partly cloudy, or cloudy, and note the direction the wind is coming from. F. Note the weather conditions, using terms such as rainy, clear, or hazy. G. Repeat steps B through F at the same time each day for 1 week. Conclusion: 1. On what day was the temperature the highest? The lowest? 2. How did the barometer change? 3. Based on how the weather changed during the week, what do you think the weather will be like tomorrow?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch11/activity-reading-barometer.jpg', caption: 'Reading a barometer' },
          { src: '/images/science/ch11/activity-weather-chart.jpg', caption: 'Recording daily weather observations in a chart' }
        ] }
      ],
      [
        { type: 'heading', text: 'Clouds' },
        { type: 'p', text: "How are cloud types related to weather? There are many types of clouds. You have learned that different types of clouds form along cold fronts and warm fronts. Clouds are named for their shape, and the type of cloud that forms depends on the conditions of the atmosphere — so the type of cloud you see depends on the weather." },
        { type: 'p', text: "The large, fluffy white clouds often seen during fair weather are called cumulus clouds. Cumulus means \"heap.\" These clouds are flat on the bottom, and their rounded tops can billow high into the sky." },
        { type: 'p', text: "The thin, wispy clouds that look like feathers or curls of hair are called cirrus clouds. Cirrus means \"curl.\" Cirrus clouds form high in the sky, where the air is very cold, so cirrus clouds are made up of tiny ice crystals." },
        { type: 'image-group', images: [
          { src: '/images/science/ch11/cumulus-clouds.jpg', caption: 'Cumulus clouds' },
          { src: '/images/science/ch11/cirrus-clouds.jpg', caption: 'Cirrus clouds' }
        ] }
      ],
      [
        { type: 'p', text: "You often see cirrus clouds in a blue sky — they are sometimes a sign that a warm front is moving in and that the weather will soon change." },
        { type: 'p', text: "Thick, low clouds that cover the sky are called stratus clouds. Stratus means \"layer.\" These sheetlike clouds are a sign of rainy weather. Fog is a stratus cloud near the ground." },
        { type: 'image-group', images: [
          { src: '/images/science/ch11/stratus-clouds.jpg', caption: 'Stratus clouds' }
        ] },
        { type: 'activity', text: "Finding out: What weather forecasts can you make by looking at clouds? Make a chart with columns for date, cloud type and temperature, and forecast. For the next 7 days, observe the clouds and try to identify the types you see. Find out the temperature at the time of your observation, and record all of this in your chart. Using what you know about clouds and fronts, try to forecast the weather for the next day. Predict how the temperature and other weather conditions will change. The next day, check your forecast and see how accurate it was." }
      ],
      [
        { type: 'p', text: "There are many other types of clouds. Sometimes clouds have two names because they have features of two types of clouds — for example, stratocumulus clouds are layers of cumulus clouds that cover the sky. Other word parts are added to the names of clouds: nimbo or nimbus means \"rain,\" so cumulonimbus clouds are dark, towering clouds that usually bring thunderstorms. They form when rapidly rising air causes cumulus clouds to build up. Alto is a word part that means \"high.\" Look at the clouds shown here. See if you can tell why each cloud was given that name." },
        { type: 'image-group', images: [
          { src: '/images/science/ch11/altocumulus-clouds.jpg', caption: 'Altocumulus clouds' },
          { src: '/images/science/ch11/stratocumulus-clouds.jpg', caption: 'Stratocumulus clouds' },
          { src: '/images/science/ch11/cumulonimbus-clouds.jpg', caption: 'Cumulonimbus clouds' }
        ] }
      ],
      [
        { type: 'image-group', images: [
          { src: '/images/science/ch11/nimbostratus-clouds.jpg', caption: 'Nimbostratus clouds' }
        ] },
        { type: 'summary', text: "The earth's surface and atmosphere are heated unevenly. Weather is caused by the uneven heating of the atmosphere." },
        { type: 'summary', text: "Weather is related to air pressure. Cold, dry air has the highest pressure; warm, wet air has the lowest pressure." },
        { type: 'summary', text: "An air mass is a large body of air that has about the same temperature and moisture throughout. The kind of air mass present determines the weather." },
        { type: 'summary', text: "Differences in air pressure cause winds. Sea and land breezes are local winds." },
        { type: 'summary', text: "Global winds cause weather to move from west to east across the United States." },
        { type: 'summary', text: "Weather changes take place at fronts. A front is the place where two air masses meet." },
        { type: 'summary', text: "The type of cloud that forms depends on the weather." }
      ],
      [
        { type: 'review', title: 'Reviewing the Chapter', sections: [
          {
            heading: 'Science Words',
            instructions: 'Identify each type of cloud, then complete each sentence with the correct science term.',
            items: [
              { prompt: "It is a type of cloud. Its name means \"curl.\" It forms high in the sky and is made up of tiny ice crystals. What is it?", answer: "Cirrus cloud" },
              { prompt: "It is a type of cloud. Its name means \"layer.\" It is sheetlike, and it is a sign of rainy weather. What is it?", answer: "Stratus cloud" },
              { prompt: "It is a type of cloud. Its name means \"heap.\" It has rounded tops that can billow high into the sky, and it is often seen during fair weather. What is it?", answer: "Cumulus cloud" },
              { prompt: "When a warm air mass moves into a cold air mass, a/an ___ forms.", answer: "warm front" },
              { prompt: "The movement of air from water to land is called a/an ___.", answer: "sea breeze" },
              { prompt: "A large body of air that has about the same temperature and moisture throughout is called a/an ___.", answer: "air mass" },
              { prompt: "When a cold air mass moves into a warm air mass, a/an ___ forms.", answer: "cold front" },
              { prompt: "The movement of air from land to water is called a/an ___.", answer: "land breeze" },
              { prompt: "The place where two air masses meet is called a/an ___.", answer: "front" }
            ]
          }
        ] }
      ],
      [
        { type: 'review', title: 'Reviewing the Chapter', sections: [
          {
            heading: 'Understanding Ideas',
            items: [
              { prompt: "What kind of air mass (cold/wet, cold/dry, warm/wet, or warm/dry) would form over: (a) a cold ocean, (b) a cold land area near the poles, (c) a warm ocean near the equator, (d) a warm, dry land area?", answer: "(a) cold, wet — (b) cold, dry — (c) warm, wet — (d) warm, dry." },
              { prompt: "Suppose a cold air mass moves into a warm air mass. What kind of front forms, and what weather changes might occur?", answer: "A cold front forms. The cold air stays close to the ground and pushes the warm air up rapidly, which can bring brief but heavy rain, strong wind, and thunderstorms — sometimes even tornadoes or blizzards — followed by a drop in temperature and clearing skies." },
              { prompt: "Describe three factors that cause the uneven heating of the earth's atmosphere.", answer: "The round shape of the earth (sunlight strikes the equator directly but the poles at a slant), differences in surface color (dark surfaces absorb more energy than light ones), and differences between land and water (land heats and cools faster than water)." }
            ]
          },
          {
            heading: 'Using Ideas',
            items: [
              { prompt: "Because the moon has no atmosphere, it has no weather. Explain why this is a true statement.", answer: "Weather is caused by the uneven heating and movement of air within an atmosphere. With no atmosphere, there is no air to be heated unevenly or to move as wind, clouds, and storms, so no weather can occur." },
              { prompt: "Weather announcers often say, \"Daytime temperatures will be cooler for places along the shore.\" Why is this?", answer: "Water heats up more slowly than land, so during the day the air over the water — and blowing onto the shore — stays cooler than the air farther inland over the warmer land." }
            ]
          }
        ] }
      ],
    ]
  },
  "Ch.12 · Beyond the Solar System": {
    title: "Beyond the Solar System",
    pages: [
      [
        { type: 'heading', text: 'Chapter 12 · Beyond the Solar System' },
        { type: 'p', text: "Have you ever looked into the night sky and wondered how far it is to the edge of space? On a clear night you can see thousands of stars. Are there any stars so far away you cannot see them?" },
        { type: 'p', text: "People have always been interested in space. What do you think this picture shows? It is a cloud of dust and gas in space. Scientists think it was left when a star exploded in the year 1054." },
        { type: 'p', text: "Objects like this are of great interest to people who study space. Scientists are trying to find out what lies beyond the solar system. They are also interested in finding out how far space extends." },
        { type: 'p', text: "In this chapter you will see how to measure distances to objects in space. You will learn about the life cycle of a star. You will also find out how stars are grouped in patterns." },
        { type: 'image-group', images: [
          { src: '/images/science/ch12/crab-nebula-opener.jpg', caption: 'A cloud of dust and gas left by a star that exploded in the year 1054' }
        ] }
      ],
      [
        { type: 'heading', text: 'Distances in Space' },
        { type: 'p', text: "What is a light-year? You know that the sun and nine planets make up most of the solar system. The sun is at the center of this system, and all the planets move in orbits around the sun. Now imagine how large the solar system must be." },
        { type: 'p', text: "The solar system is very large, but it is only one small part of a much larger system. The sun is just one of billions of stars that make up a large family of stars." },
        { type: 'p', text: "Do you have any idea how far bodies in space are from the earth? The moon is about 400,000 km away; the sun is about 150,000,000 km away. Pluto, one of the farthest planets, is about 4,520,000,000 km away. Proxima Centauri, the closest star to the earth besides the sun, is about 41,000,000,000,000 km away. As the distances get larger, the numbers become more difficult to read." },
        { type: 'image-group', images: [
          { src: '/images/science/ch12/distances-table.jpg', caption: 'Distances from the earth to the moon, sun, Pluto, and Proxima Centauri' }
        ] }
      ],
      [
        { type: 'p', text: "You are used to traveling much shorter distances. Even if you were to travel across the United States, you would only go about 4,800 km. So the distances between bodies in space may be too large to fully understand. It may help to think about how long it would take to travel to different bodies in space." },
        { type: 'p', text: "Imagine you are in a spacecraft moving at a speed of 40,000 km/h — the speed needed to escape gravity once the rocket engines are turned off, more than 400 times faster than a car on a highway. At this speed it would take about 10 hours to reach the moon, about 156 days to reach the sun, about 6,187 days to reach Pluto, and about 116,906 years to reach Proxima Centauri. It is even more difficult to imagine how long it would take to reach a star that is farther away. Do you think people from the earth will ever visit other stars?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch12/travel-time-diagram.jpg', caption: 'How long it would take to reach different bodies in space' }
        ] }
      ],
      [
        { type: 'p', text: "For centuries people have wondered about the size of the universe. The universe includes all of space and all the matter and energy in it. People have wondered how far out space goes. They have wondered where it ends, and even if it ends." },
        { type: 'image-group', images: [
          { src: '/images/science/ch12/galileo-telescope.jpg', caption: 'Astronomer looking through telescope' }
        ] },
        { type: 'p', text: "The study of the universe and all the objects in it is a science called astronomy. Astronomy includes the study of stars, planets, moons, and other objects in space. It is one of the oldest sciences. Scientists who study the universe are called astronomers." },
        { type: 'p', text: "In the picture above, the Italian astronomer Galileo is shown with his telescope. The scene may have occurred in the early 1600s. A modern telescope is shown on page 287." }
      ],
      [
        { type: 'image-group', images: [
          { src: '/images/science/ch12/sacramento-peak-observatory.jpg', caption: 'Sacramento Peak Observatory' }
        ] },
        { type: 'p', text: "You have learned that distances between certain bodies in the universe are very great. How do astronomers work with such great distances? Units such as meters and kilometers are used to measure much shorter distances. A larger unit is needed to measure distances in space." },
        { type: 'p', text: "Astronomers use the speed of light in measuring distances in space. Light travels great distances in a short time. For example, light from the sun reaches the earth in about 8 minutes. Light travels 300,000 km in 1 second (km/s), which is equal to 1,080,000,000 km/h. How much faster is this than a car on a highway? To find out, divide 1,080,000,000 by 100, which is about the speed of a car on a highway (100 km/h)." }
      ],
      [
        { type: 'p', text: "Astronomers decided to use 1 year as their time period. First they found the number of seconds in 1 year, then multiplied this number by 300,000 km. They found that the distance light travels in 1 year is 9.5 trillion km. The distance that light travels in 1 year is known as a light-year. Astronomers use this very large unit of distance to measure distances in space." },
        { type: 'p', text: "Distances from the earth to other stars are usually given in light-years. Can you imagine these distances written in smaller units, such as kilometers? The star Rigel, for example, is about 650 light-years away." },
        { type: 'image-group', images: [
          { src: '/images/science/ch12/star-distances-lightyears.jpg', caption: 'Distances to stars, measured in light-years' }
        ] }
      ],
      [
        { type: 'heading', text: 'Characteristics of Stars' },
        { type: 'p', text: "How are stars different from each other? You may think all stars look alike, but by looking closely you might observe that some seem brighter than others, and some appear to be slightly different in color. The great distances between stars and the earth make it hard to see all the differences. The most visible difference is brightness. The measure of the brightness of a star as seen from the earth is known as magnitude. In the picture, which star is the brightest?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch12/star-field-brightness.jpg', caption: 'A field of stars, showing different degrees of brightness' }
        ] },
        { type: 'p', text: "The magnitude of a star depends on three things. The first is the star's distance from the earth. Suppose two stars are exactly alike except for their distance from the earth — the one that is closer will appear brighter and have a greater magnitude. You can compare this to the headlights of a car: the closer the car is, the brighter its headlights will seem." },
        { type: 'image-group', images: [
          { src: '/images/science/ch12/car-headlights-magnitude.jpg', caption: 'Comparing star magnitude to the brightness of headlights' }
        ] }
      ],
      [
        { type: 'p', text: "The second thing that affects the magnitude of a star is size. Stars differ greatly in size. Some stars are smaller than the earth. The sun, with a diameter of 1,392,000 km, is a medium-sized star. There are stars with a diameter 10 to 100 times that of the sun, and supergiant stars with a diameter 100 to 1,000 times that of the sun." },
        { type: 'p', text: "The third thing that affects the magnitude of a star is temperature. Stars differ greatly in temperature, and the temperature of a star also determines its color — red stars are the coolest, and blue stars are the hottest. Suppose that two stars are the same distance from the earth and the same size, but one is blue and one is red — the blue star will seem brighter because it is hotter, and it will have a greater magnitude." },
        { type: 'p', text: "A star's magnitude, then, depends on its distance from the earth, its size, and its temperature. All three things must be considered." },
        { type: 'image-group', images: [
          { src: '/images/science/ch12/star-temperature-color.jpg', caption: 'How a star\'s color relates to its temperature' }
        ] }
      ],
      [
        { type: 'activity', text: "What things affect brightness? Materials: 3 identical flashlights labeled X, Y, and Z / scissors / cardboard / tape / meterstick. Procedure: A. Cut three cardboard circles to cover the end of each flashlight, each with a 1-cm hole in the center, and tape one to each flashlight. B. Mark three positions on the floor: Position 1 is 1 m away, Position 2 is 10 m away, and Position 3 is 20 m away. C. Have three classmates each hold a labeled flashlight and stand in a row at Position 1. D. Darken the room and turn on the flashlights. 1. How would you describe the brightness of each flashlight? E. Keep flashlight X at Position 1; move Y to Position 2 and Z to Position 3. 2. Which flashlight looks brightest? Dimmest? F. Replace the circles on flashlights Y and Z with ones that have 2-cm and 3-cm holes. G. Have all three students stand at Position 3 and turn on the flashlights. 3. Which flashlight looks brightest now? Dimmest? Conclusion: What two things affect how bright the flashlights look?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch12/activity-flashlight-cutting.jpg', caption: 'Cutting holes in cardboard circles for the brightness activity' },
          { src: '/images/science/ch12/activity-flashlight-positions.jpg', caption: 'Testing flashlight brightness at different positions' }
        ] }
      ],
      [
        { type: 'heading', text: 'The Life of a Star' },
        { type: 'p', text: "What is the life cycle of a star? You may be surprised to know that stars have a life cycle. New stars are being \"born\" and old stars are \"dying.\" Of course, the life and death of a star does not happen overnight — changes in stars take place over billions of years." },
        { type: 'p', text: "A star is formed from dust and gas in space. A cloud of dust and gas found in space is called a nebula. The dust and gas in such a cloud come together because of gravitational attraction — a tremendous amount of matter must collect for a new star to form, as much as there is in the sun. As the matter in the nebula presses together, it gets hot, and when enough matter has come together and the temperature is high enough, a new star is \"born.\"" },
        { type: 'image-group', images: [
          { src: '/images/science/ch12/horsehead-nebula.jpg', caption: 'Horsehead Nebula' },
          { src: '/images/science/ch12/star-life-cycle-panel-1-3.jpg', caption: 'The life cycle of a star: 1. nebula, 2. young star, 3. middle-aged star' }
        ] }
      ],
      [
        { type: 'p', text: "When a star first forms, it has a red glow — in this stage the star is large and cool, and the matter of the star continues to come together. When a star is \"middle-aged,\" it may be blue, white, yellow, or red, depending on its temperature, which in turn depends on how much matter has collected: the more matter, the hotter the star. A hot, blue star forms when a great deal of matter collects; a cool, red star forms when a smaller amount collects. The sun is a yellow star — larger and hotter than a red star, but smaller and cooler than a blue star." },
        { type: 'p', text: "A star beginning \"old age\" often swells up to form a red giant, a star many times larger than the sun but with a lower temperature. Some scientists believe that the sun will enter this stage millions of years from now." },
        { type: 'image-group', images: [
          { src: '/images/science/ch12/star-life-cycle-sun-comparison.jpg', caption: 'The life cycle of a star: sun compared to a red giant' },
          { src: '/images/science/ch12/star-life-cycle-panel-4-6.jpg', caption: 'The life cycle of a star: 4. red giant, 5. white dwarf, 6. black dwarf' }
        ] }
      ],
      [
        { type: 'p', text: "After a while, a red giant begins to collapse into a smaller star. It becomes hotter and appears white in color — a small star in this stage is called a white dwarf. It may be about as large as the earth, and because it is small, a white dwarf does not appear bright." },
        { type: 'p', text: "Once most of a star's fuel is gone, it enters the last stage of its life and becomes a black dwarf. In this stage the star has no heat or light — it is a cold, dense object in space." },
        { type: 'p', text: "Not all stars follow these stages. Stars that collapse into the white dwarf stage sometimes explode and become very bright — an exploding star of this type is called a nova. After the explosion, the star will slowly shrink and grow dim. Sometimes a very large star may explode violently, and this is called a supernova. The Crab Nebula shown at the start of this chapter is a supernova." },
        { type: 'image-group', images: [
          { src: '/images/science/ch12/supernova-neutron-star.jpg', caption: 'Supernova (left) and neutron star (right)' }
        ] }
      ],
      [
        { type: 'heading', text: 'Black Holes' },
        { type: 'p', text: "Stars that explode into supernovas sometimes collapse into very dense stars called neutron stars. A neutron star is much smaller than a white dwarf, even though it has more matter packed into it." },
        { type: 'p', text: "Some scientists think that the gravitational pull of a neutron star can be so great that the star disappears. When this happens, a black hole forms. A black hole is a region in space that was once occupied by a star. Some people believe that the gravity of a black hole is so great that not even light can escape." },
        { type: 'image-group', images: [
          { src: '/images/science/ch12/black-hole-drawing.jpg', caption: 'A black hole' }
        ] }
      ],
      [
        { type: 'heading', text: 'Families of Stars' },
        { type: 'p', text: "What are the shapes of galaxies? By this time you probably know that there is gravity everywhere in the universe. Each body in space attracts every other body. Because of gravity, no bodies are all alone in space — instead, bodies in space collect in families. The sun is one of billions of stars that form the family called the Milky Way. A large group of stars and other bodies in space is called a galaxy. The Milky Way is a spiral galaxy — this type of galaxy is shaped like a flat disk, or wheel, with curved arms coming out from the center." },
        { type: 'image-group', images: [
          { src: '/images/science/ch12/milky-way-spiral-diagram.jpg', caption: 'The Milky Way, a spiral galaxy' }
        ] }
      ],
      [
        { type: 'p', text: "The Milky Way is about 100,000 light-years from edge to edge. The solar system is about one third of the way from the outer edge of the Milky Way. The sun is believed to be one of about 200 billion stars in the Milky Way. Can you find the sun in the drawing of the Milky Way?" },
        { type: 'p', text: "Many scientists believe that all the objects in the Milky Way revolve around its center. This means that the sun and its planets are moving around the center of the Milky Way. The Milky Way is so large that it takes the sun 250 million years to go once around. It is possible that the sun is just now returning to the place where it was before dinosaurs were on the earth." }
      ],
      [
        { type: 'p', text: "All galaxies are not spiral-shaped. Two other types of galaxies have been discovered. One of these is the elliptical galaxy. An elliptical galaxy is like a spiral one, but it does not have arms. There are more elliptical galaxies than spiral galaxies. But the elliptical galaxies are not as large or as bright. Most of the stars in elliptical galaxies are very old." },
        { type: 'p', text: "Another kind of galaxy is called an irregular galaxy. An irregular galaxy does not have a definite shape or size. Some scientists believe that this type of galaxy may have formed when two or more galaxies bumped into one another." },
        { type: 'image-group', images: [
          { src: '/images/science/ch12/elliptical-spiral-galaxies.jpg', caption: 'Elliptical galaxy (top); spiral galaxy (bottom)' }
        ] }
      ],
      [
        { type: 'image-group', images: [
          { src: '/images/science/ch12/spiral-galaxy-photo.jpg', caption: 'Spiral galaxy' }
        ] },
        { type: 'p', text: "Many astronomers believe that entire galaxies are moving. They think that galaxies are moving toward the outer edges of the universe. The galaxies seem to be moving away from each other. The belief that galaxies are moving is part of a theory that suggests that the universe is expanding. No one seems to know why the universe is expanding. No one knows if it will ever stop expanding. What is your theory about the universe?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch12/movement-of-galaxies.jpg', caption: 'Movement of galaxies' }
        ] }
      ],
      [
        { type: 'activity', text: "Can you make a model of the moving galaxies? Materials: round balloon / felt-tip pen / string / 10-cm twist-tie / metric ruler. Procedure: A. Blow up a round balloon to a small size and twist-tie it closed — the balloon represents the universe. B. Mark five dots on the balloon with a felt-tip pen, labeled V, W, X, Y, and Z, with V in the center and the others an equal distance from V — the dots represent galaxies. C. Use string to measure the distance from V to each of the other dots in millimeters, and record these distances. D. Untie the balloon, blow it up to a medium size, and re-tie it. Repeat step C. 1. Have the distances between dots changed? 2. Find the difference between the small- and medium-balloon measurements. E. Blow the balloon up to a large size and repeat step C again. 3. Have the distances changed further? 4. Find the difference between the medium- and large-balloon measurements. Conclusion: 1. How is the expanding balloon like the universe? 2. If dot V represents the Milky Way and the other dots represent other galaxies, what is happening to the galaxies?" }
      ],
      [
        { type: 'heading', text: 'Star Patterns' },
        { type: 'p', text: "What is a constellation? People have always been interested in the objects they could see in the sky. For centuries people have gazed into the night sky and wondered about stars — what they were made of and how big they were. As people watched, they noticed that stars seemed to form groups, and that even though the stars seemed to change position, the groups stayed together." },
        { type: 'p', text: "Ancient people saw patterns in these groups of stars and gave them names. Today we call these star patterns constellations. One of the best-known constellations is the Big Dipper. Another is Scorpio, shown on page 289. Have you ever seen these constellations? Can you name other constellations?" },
        { type: 'activity', text: "Finding out: Why do stars seem to move? You may know that the stars seem to move in the sky, but you do not see them moving — they seem to move because the earth moves. You can show how the stars seem to move using a black umbrella and a star chart. Use chalk to draw a few familiar constellations on the underside of the opened umbrella, and be sure to draw the North Star at the point where the handle connects with the ribs of the umbrella. Slowly turn the handle of the umbrella counterclockwise. This shows how the stars seem to move in the sky as the earth turns." },
        { type: 'image-group', images: [
          { src: '/images/science/ch12/activity-star-motion-umbrella.jpg', caption: 'A student uses a black umbrella with chalk-drawn constellations to show how the stars seem to move' }
        ] }
      ],
      [
        { type: 'p', text: "The constellations helped people keep track of certain stars in the sky. People could watch the movements of these stars and use them to measure time and the seasons." },
        { type: 'p', text: "How did the constellations first get their names? Years ago, ancient people named many constellations for people or animals — some examples are the Great Bear, the Little Bear, and Draco (the Dragon). These names are still used today." },
        { type: 'image-group', images: [
          { src: '/images/science/ch12/constellation-great-bear.jpg', caption: 'Great Bear' },
          { src: '/images/science/ch12/constellation-twins.jpg', caption: 'Twins, with Pollux marked' }
        ] },
        { type: 'p', text: "Some constellations are shown on this page. The drawings show the main stars in the constellations. They also show the figure that each star pattern looks like. The main stars in a constellation have names too. Sirius, part of the Big Dog, is the brightest star in the sky. Vega is a star in Lyra, a constellation shaped like a lyre, a type of harp. Pollux is part of the constellation called the Twins. See if you can find some of these stars in the drawings of the constellations. Do the constellations really look like the things for which they were named?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch12/constellations-lyra-draco-bigdog.jpg', caption: 'Lyra, with Vega marked; Draco; and Big Dog, with Sirius marked' }
        ] }
      ],
      [
        { type: 'summary', text: "Astronomy is the study of the universe and all the objects in it. Scientists who study the universe are called astronomers." },
        { type: 'summary', text: "The distance to objects in space is measured in light-years. A light-year is the distance light travels in 1 year." },
        { type: 'summary', text: "Magnitude is a measure of the brightness of a star as seen from the earth. Magnitude depends on the distance, size, and temperature of a star." },
        { type: 'summary', text: "The color of a star and its temperature are related. The coolest stars are red; the hottest are blue." },
        { type: 'summary', text: "New stars are always forming and old ones are dying. During its life cycle a star may change color, temperature, and size." },
        { type: 'summary', text: "A galaxy is a group of billions of stars. A galaxy may be spiral, elliptical, or irregular in shape." },
        { type: 'summary', text: "A constellation is a group of stars that seem to form a pattern. Ancient people named constellations for familiar objects." }
      ],
      [
        { type: 'review', title: 'Reviewing the Chapter', sections: [
          {
            heading: 'Science Words',
            instructions: 'A. Use all the terms below to fill in the blanks: astronomers, astronomy, light-year, universe.',
            items: [
              { prompt: "Space and all the matter and energy in it is called the ___.", answer: "universe" },
              { prompt: "The study of the stars, planets, moons, and other objects in space is called ___.", answer: "astronomy" },
              { prompt: "Scientists who do this study are called ___.", answer: "astronomers" },
              { prompt: "To measure distances in space, scientists use a unit called a/an ___.", answer: "light-year" }
            ]
          },
          {
            heading: 'Science Words — Matching',
            instructions: 'B. Write the letter of the term that best matches the definition. Not all the terms will be used.',
            items: [
              { prompt: "A large group of stars and other bodies in space", answer: "galaxy" },
              { prompt: "An exploding star", answer: "nova" },
              { prompt: "Region in space once occupied by a star", answer: "black hole" },
              { prompt: "Last stage in the life cycle of a star", answer: "black dwarf" },
              { prompt: "Pattern of stars", answer: "constellation" },
              { prompt: "Measure of the brightness of a star as seen from the earth", answer: "magnitude" },
              { prompt: "Galaxy shaped like a wheel with arms coming out of center", answer: "spiral galaxy" },
              { prompt: "Cloud of dust and gas in space", answer: "nebula" },
              { prompt: "A very dense star", answer: "neutron star" },
              { prompt: "Star much larger than the sun", answer: "red giant" }
            ]
          }
        ] }
      ],
      [
        { type: 'review', title: 'Reviewing the Chapter', sections: [
          {
            heading: 'Understanding Ideas',
            items: [
              { prompt: "List the three characteristics that determine the magnitude of a star.", answer: "Its distance from the earth, its size, and its temperature." },
              { prompt: "The drawings below show some of the stages in the life cycle of a star. Write the numbers of the drawings to show the correct order. Describe each stage.", answer: "Order: 1 (nebula) → 4 (middle-aged star) → 2 (red giant) → 3 (supernova/white dwarf remnant). 1. A cloud of dust and gas begins to collect into a new star. 4. The star glows and shines steadily as a middle-aged star. 2. The aging star swells into a large, cooler red giant. 3. The star's outer layers are blown off, leaving behind a remnant such as a white dwarf or the debris of a supernova." }
            ]
          },
          {
            heading: 'Using Ideas',
            items: [
              { prompt: "Choose your favorite constellation. Find out the story behind its name, and draw the constellation.", answer: "Answers will vary — research the myth or origin behind a constellation's name and sketch its star pattern." },
              { prompt: "Make up your own constellation. Write a story telling how it got its name.", answer: "Answers will vary — invent an original star pattern and an origin story to go with it." }
            ]
          }
        ] },
        { type: 'image-group', images: [
          { src: '/images/science/ch12/star-life-cycle-order-quiz.jpg', caption: 'Four stages in the life cycle of a star, shown out of order' }
        ] }
      ],
    ]
  },
  "Ch.13 · Support and Movement of the Body": {
    title: "Support and Movement of the Body",
    pages: [
      [
        { type: 'heading', text: 'Chapter 13 · Support and Movement of the Body' },
        { type: 'p', text: "Have you ever played volleyball? Have you ever thought about how your body moves when you run or jump up to hit the ball? Every time your body moves, dozens of muscles and bones are put into action. Muscles and bones work together to move your whole body when you play volleyball. And muscles and bones work together to move your fingers, hand, and arm when you write." },
        { type: 'p', text: "In this chapter you will learn about bones and muscles. You will learn what they look like and how they work together. You will also learn how to keep them healthy." }
      ],
      [
        { type: 'heading', text: 'Your Body\'s Framework' },
        { type: 'p', text: "What jobs does the skeleton do? Some animals have a soft body, and the water they live in helps support it. Some animals have a hard outer covering that supports and protects their body. Still other living things have bones inside their body — these bones make up the skeleton. The skeleton is the system of bones that supports and protects the body and the organs inside it. The skeleton is also called the skeletal system." },
        { type: 'image-group', images: [
          { src: '/images/science/ch13/human-skeleton-diagram.jpg', caption: 'The human skeleton' }
        ] }
      ],
      [
        { type: 'p', text: "The skeleton of your body can be compared with the steel framework of a building. The steel beams give a building its shape and support, and the skeletal system forms the framework of the body in much the same way — it supports the body and gives it shape. But it does other jobs too: some parts of the skeleton protect soft parts of the body, such as the brain, heart, and lungs." },
        { type: 'p', text: "The skeleton is different from the framework of a building in an important way. The steel framework of a building cannot move, but the skeleton can move, because muscles are attached to the bones of the skeleton and make the bones move. In fact, the skeleton has 206 bones that help it do its jobs. There are two kinds of bones in the head — the bones of the face and the bones that protect the brain — and together they are joined to form the skull." },
        { type: 'image-group', images: [
          { src: '/images/science/ch13/skyscraper-construction.jpg', caption: 'A skyscraper being built' },
          { src: '/images/science/ch13/skull-front-side-view.jpg', caption: 'Bones of the skull, front and side view' }
        ] }
      ],
      [
        { type: 'p', text: "The skeleton in the middle part of the body is made up of the backbone and ribs. As you learned earlier, the backbone is made of many small bones called vertebrae. These bones protect many nerves in your back and also help support your body. Some of the bones of the backbone are attached to ribs — there are 12 pairs of them — and the ribs protect organs inside the body, such as the lungs." },
        { type: 'p', text: "The shoulders, arms, hips, and legs are also parts of the skeleton. The shoulders are made of flat bones: the collarbones and the shoulder blades. The hips are made of bones in the shape of a bowl, and this bowl shape helps support and protect the organs inside the body." },
        { type: 'image-group', images: [
          { src: '/images/science/ch13/hip-bones-diagram.jpg', caption: 'Hip bones' },
          { src: '/images/science/ch13/backbone-vertebrae-diagram.jpg', caption: 'The backbone, made of vertebrae' },
          { src: '/images/science/ch13/ribs-lungs-heart-diagram.jpg', caption: 'The ribs, protecting the lungs and heart' }
        ] }
      ],
      [
        { type: 'p', text: "Long bones make up the arms and legs. The center of these bones contains a soft material called bone marrow, which produces new blood cells — another important job of the skeletal system." },
        { type: 'p', text: "The leg bones are longer and heavier than the bones in the arm. The strength of the leg bones allows them to hold the body upright when walking or running. The long bone in the thigh is called the femur. It is the longest and heaviest bone in the body." },
        { type: 'image-group', images: [
          { src: '/images/science/ch13/bone-marrow-cross-section.jpg', caption: 'Bone marrow inside a long bone' },
          { src: '/images/science/ch13/arm-leg-bones-diagram.jpg', caption: 'Arm bones and leg bones compared' }
        ] }
      ],
      [
        { type: 'p', text: "When you were born, your skeleton was made of a soft, bonelike material that bends, called cartilage. As you grow older, much of this cartilage changes to hard bone. Not all the cartilage in the body changes to bone, though — the tip of your nose and your ears are made of cartilage." },
        { type: 'p', text: "Cartilage is important in other places in your body too. The backbone is made of many small bones, and nerves travel out from between these bones. If the bones were able to rub against one another, they would also rub against the nerves, which would be very painful — but pads of cartilage between the bones prevent this. Pads of cartilage are also found at the ends of the long bones in your arms and legs, where they act as cushions, or shock absorbers." },
        { type: 'sidebar', text: "Do you know? Some scientists believe that human cartilage may one day be used to prevent, treat, and even cure some diseases. Research shows that cartilage contains a special substance called anti-invasion factor (AIF). Scientists have removed AIF from cartilage and found that it stops the growth of cancer — they believe it may also prevent blindness caused by diabetes and even cure some gum diseases. Scientists hope that they will one day be able to produce AIF in the laboratory." },
        { type: 'image-group', images: [
          { src: '/images/science/ch13/vertebrae-cartilage-pads.jpg', caption: 'Pads of cartilage between vertebrae' },
          { src: '/images/science/ch13/cartilage-microscope.jpg', caption: 'Cartilage seen through a microscope' }
        ] }
      ],
      [
        { type: 'heading', text: 'Where Bones Meet' },
        { type: 'p', text: "What are four kinds of joints? Parts of your skeleton can move because of the way bones are joined together. The place where two or more bones are joined together is called a joint. Most joints in the body allow the body to move. Bones are held together at joints by strong cords of tissue called ligaments." },
        { type: 'p', text: "The kind of joint that allows the most movement of bones is a ball-and-socket joint. This joint is formed by a round knob at the end of one bone, which fits into a hollow cavity, or socket, at the end of another bone — the joint that connects the upper arm to the shoulder works this way, which is why your arm can move in so many directions." },
        { type: 'image-group', images: [
          { src: '/images/science/ch13/knee-ligaments-diagram.jpg', caption: 'Ligaments in the knee' },
          { src: '/images/science/ch13/ball-and-socket-shoulder-joint.jpg', caption: 'Ball-and-socket joint of the shoulder' }
        ] }
      ],
      [
        { type: 'p', text: "A ball-and-socket joint allows bones to move in many directions, but some bones can only move back and forth, because they are connected by another kind of joint. A hinge joint allows bones to move back and forth — your knee is a hinge joint." },
        { type: 'p', text: "Your skull is attached to your backbone by a pivot joint, between the first two vertebrae, and a pivot joint allows for movement from side to side — this is what lets you turn your head. The bones of the skull, on the other hand, are joined together but cannot move at all. The kind of joint between bones that cannot move is called a fixed joint." },
        { type: 'image-group', images: [
          { src: '/images/science/ch13/hinge-joint-knee.jpg', caption: 'Hinge joint of the knee' },
          { src: '/images/science/ch13/pivot-joint-neck.jpg', caption: 'Pivot joint of the neck' },
          { src: '/images/science/ch13/fixed-joints-skull.jpg', caption: 'Fixed joints of the skull' }
        ] }
      ],
      [
        { type: 'heading', text: 'Muscles Move Bones' },
        { type: 'p', text: "How do muscles move bones? Bones form the framework of your body, and bones are able to move because muscles move them. The whole skeletal system is covered with muscles, made of soft but strong tissue. The muscles in the body make up the muscular system, and you have more than 600 of them. The drawing shows the muscles of someone who is running." },
        { type: 'image-group', images: [
          { src: '/images/science/ch13/runner-photo.jpg', caption: 'A runner in motion' },
          { src: '/images/science/ch13/muscles-of-runner-diagram.jpg', caption: 'Muscles of someone running' }
        ] }
      ],
      [
        { type: 'p', text: "Muscles are attached to bones by tough cords called tendons — you can feel tendons in your hand and wrist, and also the big tendon that connects the large muscle in the calf of your leg to your heel. The drawing below shows this tendon." },
        { type: 'image-group', images: [
          { src: '/images/science/ch13/calf-muscle-tendon-diagram.jpg', caption: 'The calf muscle and its tendon' }
        ] },
        { type: 'p', text: "Most muscles of the body move bones by contracting. When a muscle contracts, it becomes shorter and thicker; when a muscle relaxes, it becomes longer and thinner. Muscle is the only kind of tissue that can contract and relax, and this contracting and relaxing is what causes movement." },
        { type: 'p', text: "Most muscles that move bones work in pairs. One muscle pulls a bone in one direction, and the other muscle of the pair pulls it in the opposite direction — because muscles can only pull, never push. To make a bone move, one muscle contracts and pulls the bone, while the other muscle of the pair relaxes." }
      ],
      [
        { type: 'p', text: "You can observe how pairs of muscles contract and relax to move a bone in your own body. Place your left hand over the muscle on the top of your upper right arm, then move the lower half of your right arm upward. You should feel the muscle in your right arm bulge — it bulges because it is contracting, pulling the bones in your lower arm upward. Now feel the muscle on the underside of your right arm; it should feel soft, because it is relaxed." },
        { type: 'p', text: "Now lower your arm and feel the same pair of muscles again. Which one contracts this time, and which one relaxes?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch13/upper-arm-muscle-pair.jpg', caption: 'Contracted and relaxed muscles of the upper arm' },
          { src: '/images/science/ch13/lower-arm-muscle-pair.jpg', caption: 'How muscles move bones of the lower arm' }
        ] }
      ],
      [
        { type: 'activity', text: "Hands-on: What happens when muscles become tired? Materials: clock or watch with second hand. Procedure: A. Copy a paragraph from any page in this book. Then move the fingers of your writing hand quickly, as though you were playing a piano. Keep moving your fingers until your fingers or arm become tired. Now copy the same paragraph again. Compare the way your handwriting looks in the two samples. 1. Was it harder to write when your fingers were tired? 2. How do your two handwriting samples differ? B. While seated, raise one leg as shown. Record the time you begin. Keep your leg raised until it becomes tired. Record the time when you put your leg down. Rest for 30 seconds. 3. How long did you keep your leg raised? C. Repeat step B at once. 4. How long did you keep your leg raised this time? 5. How do the results for step B compare with these results? Conclusion: 1. How do tired muscles affect how well you can do a task? 2. How do tired muscles affect how long you can do a task? Using science ideas: Repeat steps B and C five times in a row. Graph your results. Suppose someone rides a bicycle every day for an hour. How might this affect that person's results for steps B and C?" },
        { type: 'image-group', images: [
          { src: '/images/science/ch13/activity-writing-hand.jpg', caption: 'Testing handwriting before and after tired fingers' },
          { src: '/images/science/ch13/activity-boy-raised-leg.jpg', caption: 'Timing how long a raised leg stays up' }
        ] }
      ],
      [
        { type: 'heading', text: 'Two Groups of Muscles' },
        { type: 'p', text: "What are two groups of muscles? You can control some of the muscles in your body — the ones that help you walk, run, sit down, get up, or jump. The muscles you can control are called voluntary muscles. Voluntary muscles are attached to bones and other muscles, and they move these bones and muscles." },
        { type: 'p', text: "Muscles that you cannot control are called involuntary muscles, and you need them to stay alive. Suppose you had to control your own heartbeat — you would have to think about moving your heart muscle every moment of your life. Other involuntary muscles are in the stomach and intestines, where they move food along; involuntary muscles also move blood through the blood vessels, and even cause you to blush or turn pale." },
        { type: 'image-group', images: [
          { src: '/images/science/ch13/kids-running-activity.jpg', caption: 'Voluntary muscles at work, running' },
          { src: '/images/science/ch13/sack-race-activity.jpg', caption: 'Voluntary muscles at work, a sack race' },
          { src: '/images/science/ch13/ball-game-activity.jpg', caption: 'Voluntary muscles at work, playing ball' }
        ] }
      ],
      [
        { type: 'sidebar', text: "Try this: Are your eyelids controlled by both voluntary and involuntary muscles? Look at your eyes in a mirror and see how long you can go without blinking — then blink four times in a row on purpose. Which kind of muscle stops you from blinking, and which kind lets you choose to blink? Now look at the pupil of one eye, the dark circular opening at its center that controls how much light enters. Have someone shine a dim flashlight on it and watch what happens to its size. Since you cannot control that change yourself, what kind of muscle must be controlling the pupil?" },
        { type: 'p', text: "There are three kinds of muscles. Most muscles that move bones are made of long fibers — these are voluntary muscles called skeletal muscles. The involuntary muscles that make up most body organs, such as the blood vessels, stomach, and intestines, are called smooth muscles. A third kind of muscle, found only in the heart, is called heart muscle — it too is involuntary. The heart is the hardest-working muscle in the body: it beats between 2 billion and 3 billion times during an average lifetime." },
        { type: 'image-group', images: [
          { src: '/images/science/ch13/eye-flashlight-activity.jpg', caption: 'Testing how the pupil responds to light' },
          { src: '/images/science/ch13/skeletal-muscle-microscope.jpg', caption: 'Skeletal muscle' },
          { src: '/images/science/ch13/smooth-muscle-microscope.jpg', caption: 'Smooth muscle' },
          { src: '/images/science/ch13/heart-muscle-microscope.jpg', caption: 'Heart muscle' }
        ] }
      ],
      [
        { type: 'heading', text: 'Bone and Muscle Injuries' },
        { type: 'p', text: "What are some common injuries of bones and muscles? Even though bones are strong, they can be damaged. A crack or a break in a bone is called a fracture, and there are different kinds. Usually when a bone breaks, it does not push through the muscle and skin — this is called a simple fracture. Sometimes the broken end of a bone does push through the muscle and skin, which is called a compound fracture and carries a much greater risk of infection." },
        { type: 'p', text: "Because bones contain living tissue, they can repair themselves. A doctor puts the parts of a broken bone back in place, or sets it, and a cast holds the broken bones in place while they grow back together." },
        { type: 'image-group', images: [
          { src: '/images/science/ch13/simple-compound-fracture-diagram.jpg', caption: 'Simple fracture and compound fracture' },
          { src: '/images/science/ch13/cast-being-applied.jpg', caption: 'A cast being applied' }
        ] }
      ],
      [
        { type: 'p', text: "The ligaments that connect bones can also be injured. A sprain is an injury in which a ligament is stretched or torn, which happens when a joint is forced to move in a way other than the way it normally moves — football players, for example, often suffer torn ligaments in the knee when hit from the side, and ankle and wrist sprains happen the same way." },
        { type: 'p', text: "Sometimes muscles are injured. Some muscle injuries are caused by overuse of a muscle. A muscle strain is an injury caused by overstretching a muscle or tendon. Muscle strain often results when someone lifts a heavy object in the wrong way. The pictures show the correct way to lift a heavy object." },
        { type: 'p', text: "Did you ever wake up in the middle of the night with a cramp in your leg or foot? A cramp is a sudden, strong contraction of a muscle. It can be very painful, but it does not usually last long. Often you can help get rid of a cramp by rubbing the muscle." },
        { type: 'image-group', images: [
          { src: '/images/science/ch13/football-knee-injury.jpg', caption: 'Checking a football player\'s knee injury' },
          { src: '/images/science/ch13/proper-lifting-technique.jpg', caption: 'The proper way to lift a heavy object' }
        ] }
      ],
      [
        { type: 'heading', text: 'Care of Bones and Muscles' },
        { type: 'p', text: "How can you keep bones and muscles healthy? Three important things help: a proper diet, the right kind of exercise, and enough rest. A proper diet includes foods from four main groups. The meat group contains protein needed for cell growth and to make new cells. The dairy group includes foods with minerals that make bones hard. The fruit and vegetable group provides needed vitamins. And the bread and cereal group provides the energy that muscles need to move bones." },
        { type: 'image-group', images: [
          { src: '/images/science/ch13/food-meat-group.jpg', caption: 'Meat group' },
          { src: '/images/science/ch13/food-dairy-group.jpg', caption: 'Dairy group' },
          { src: '/images/science/ch13/food-fruit-vegetable-group.jpg', caption: 'Fruit and vegetable group' },
          { src: '/images/science/ch13/food-bread-cereal-group.jpg', caption: 'Bread and cereal group' }
        ] }
      ],
      [
        { type: 'activity', text: "Hands-on: What happens to bones when minerals are removed from them? Materials: leg or thigh bone from uncooked chicken / jar / vinegar / paper towel. Procedure: A. Remove all the meat from a chicken bone. Wash the bone in water and then dry it with a paper towel. Feel the bone. Then gently try to bend the bone. 1. Does the bone feel hard or soft? 2. Does the bone bend? B. Half fill a jar with vinegar. Place the bone in the jar. Allow the bone to remain in the vinegar for 5 days. Vinegar removes minerals from bone. C. After 5 days, remove the bone from the jar. Wash the bone in water and then dry it with a paper towel. Feel the bone. Gently try to bend the bone. 3. How does the bone feel now compared with the way it felt in step A? 4. Does the bone bend? Conclusion: 1. If you did not eat foods containing minerals, what would your bones be like? 2. How would a lack of minerals affect the ability of your skeleton to support your body? Using science ideas: Vitamin D is needed for strong bones and teeth. Find out why this vitamin is often called the sunshine vitamin." },
        { type: 'image-group', images: [
          { src: '/images/science/ch13/activity-girl-vinegar-bone.jpg', caption: 'Soaking a chicken bone in vinegar' },
          { src: '/images/science/ch13/activity-bending-bone.jpg', caption: 'Testing whether the bone bends' }
        ] }
      ],
      [
        { type: 'p', text: "In addition to a proper diet, exercise is important for the growth and development of muscles. When muscles are not used, they shrink — they become smaller and weaker. Exercise keeps muscles strong." },
        { type: 'p', text: "While exercise is important, it also creates a problem: as energy is used and food is burned during exercise, waste products are left behind in the muscles. Rest helps get rid of these wastes and keeps muscles from being overused. Sleep helps relax muscles and rid them of waste materials." },
        { type: 'summary', text: "The skeletal system forms the framework of the body and protects soft body parts." },
        { type: 'summary', text: "Most joints allow the body to move. The main kinds are ball-and-socket joints, hinge joints, and pivot joints; fixed joints do not allow movement." },
        { type: 'summary', text: "Bones are moved when muscles contract and relax." },
        { type: 'summary', text: "Skeletal muscle is voluntary muscle. Smooth muscle and heart muscle are involuntary muscle." },
        { type: 'summary', text: "Injuries to the skeletal system include fractures and sprains." },
        { type: 'summary', text: "Injuries to the muscular system include strains and cramps." },
        { type: 'summary', text: "Muscles and bones can be kept healthy with proper diet, exercise, and rest." }
      ],
      [
        { type: 'review', title: 'Reviewing the Chapter', sections: [
          {
            heading: 'Science Words',
            instructions: 'Use all the terms below to complete the sentences: simple fracture, skull, compound fracture, cartilage, bone marrow, skeleton.',
            items: [
              { prompt: "The system of bones that supports and protects the body and the organs inside it is the ___.", answer: "skeleton" },
              { prompt: "The bones of the face are part of the ___.", answer: "skull" },
              { prompt: "New blood cells are made by a soft material called ___.", answer: "bone marrow" },
              { prompt: "Pads of ___ prevent the small bones of the back from rubbing together.", answer: "cartilage" },
              { prompt: "A break in a bone in which the broken end pushes through muscle and skin is a/an ___.", answer: "compound fracture" },
              { prompt: "A break in a bone in which this does not happen is called a/an ___.", answer: "simple fracture" }
            ]
          },
          {
            heading: 'Science Words — Matching',
            instructions: 'Match each definition to the term it describes.',
            items: [
              { prompt: "Attaches muscles to bone", answer: "tendon" },
              { prompt: "Injury caused by overstretching a muscle or tendon", answer: "strain" },
              { prompt: "The place where two or more bones are joined together", answer: "joint" },
              { prompt: "Any crack or break in a bone", answer: "fracture" },
              { prompt: "Muscle that you can control", answer: "voluntary muscle" },
              { prompt: "Holds bones together at a joint", answer: "ligament" },
              { prompt: "Muscle that you cannot control", answer: "involuntary muscle" },
              { prompt: "A sudden, strong muscle contraction", answer: "cramp" },
              { prompt: "Injury in which a ligament is torn or stretched", answer: "sprain" }
            ]
          }
        ] }
      ],
      [
        { type: 'review', title: 'Reviewing the Chapter', sections: [
          {
            heading: 'Using Ideas',
            instructions: 'A. Identify each of the following.',
            items: [
              { prompt: "It is a kind of muscle. It makes up the hardest working muscle in the body. What is it?", answer: "Heart muscle" },
              { prompt: "It is a kind of muscle. It makes up the inside of the blood vessels, stomach, and other organs. What is it?", answer: "Smooth muscle" },
              { prompt: "It is a kind of muscle. It is muscle that moves bones. What is it?", answer: "Skeletal muscle" }
            ]
          },
          {
            heading: 'Using Ideas — Joints',
            instructions: 'B. Write the name of each kind of joint in the drawings.',
            items: [
              { prompt: "Joints 1 and 2 (hip, and backbone/vertebrae)", answer: "Ball-and-socket joint (1, hip) and a joint of the backbone" },
              { prompt: "Joint 3 (skull)", answer: "Fixed joint" },
              { prompt: "Joint 4 (shoulder)", answer: "Ball-and-socket joint" }
            ]
          },
          {
            heading: 'Using Ideas — Food Groups',
            instructions: 'C. Name the four food groups.',
            items: [
              { prompt: "Identify three different foods in each group.", answer: "Meat group, dairy group, fruit and vegetable group, bread and cereal group — answers will vary for the three foods named in each." },
              { prompt: "Write what each food group provides that keeps your bones and muscles healthy and working properly.", answer: "Meat group — protein for cell growth; dairy group — minerals that make bones hard; fruit and vegetable group — vitamins; bread and cereal group — energy for muscles to move bones." }
            ]
          },
          {
            heading: 'Understanding Ideas',
            instructions: 'Think through these on your own.',
            items: [
              { prompt: "Prepare three menus — one each for breakfast, lunch, and dinner — making sure each meal includes foods from all four food groups.", answer: "Answers will vary — check that each menu includes at least one food from the meat, dairy, fruit/vegetable, and bread/cereal groups." },
              { prompt: "Use a reference book to find out what kind of injury a dislocated bone is, and describe the treatment that is usually given.", answer: "A dislocation happens when a bone is forced out of its normal position at a joint. Treatment usually involves a doctor carefully guiding the bone back into place (called reduction) and then immobilizing the joint with a splint or cast so it can heal." }
            ]
          }
        ] },
        { type: 'image-group', images: [
          { src: '/images/science/ch13/joint-types-quiz-drawings.jpg', caption: 'Four kinds of joints, numbered for the quiz' }
        ] }
      ]
    ]
  },
  "Ch.14 · Transport Systems of the Body": {
    title: "Transport Systems of the Body",
    pages: [
      [
        { type: 'heading', text: 'Chapter 14 · Transport Systems of the Body' },
        { type: 'p', text: "Imagine a doctor testing a patient's heart while the patient exercises, watching closely the whole time. A test like this can reveal a great deal about the health of a person's heart and blood vessels." },
        { type: 'p', text: "The heart and blood vessels carry food and oxygen throughout the body and also remove certain wastes — together they form a transport system. In this chapter you will learn about the three main transport systems of the body, the structures that make them up, how they work, and some of the diseases that affect them." },
        { type: 'image-group', images: [
          { src: '/images/science/ch14/heart-monitor-equipment.jpg', caption: 'A doctor testing a patient\'s heart during exercise' }
        ] }
      ],
      [
        { type: 'heading', text: 'The Circulatory System' },
        { type: 'p', text: "What are the two jobs of the circulatory system? The circulatory system is one of the body's transport systems. It carries needed materials, such as food and oxygen, to the cells of the body, and it also carries away waste products. Another important job of the circulatory system is to protect the body from disease — it serves as a defense system. The circulatory system has three main parts that help it perform its jobs: the blood, the heart, and the blood vessels." },
        { type: 'p', text: "How much blood is in the body? An average adult has about 5 liters of blood." },
        { type: 'image-group', images: [
          { src: '/images/science/ch14/five-liters-milk-bottles.jpg', caption: 'Five liters, about how much blood an adult has' },
          { src: '/images/science/ch14/donating-blood.jpg', caption: 'Donating blood' }
        ] }
      ],
      [
        { type: 'p', text: "Blood is a liquid with solid parts floating in it. The liquid part of the blood is called plasma. Plasma is yellowish in color, is mostly water, and contains many important chemicals — it makes up over half of the blood." },
        { type: 'p', text: "There are three different kinds of solid parts in the blood. The first is the red blood cells, which carry oxygen to all the cells of the body. They can do this because they contain a special chemical called hemoglobin, which contains iron and gives blood its red color. A red blood cell looks something like a doughnut without a hole, and it is very small — a single drop of blood contains about 5 million red blood cells." },
        { type: 'image-group', images: [
          { src: '/images/science/ch14/container-of-plasma.jpg', caption: 'Plasma, the liquid part of blood' },
          { src: '/images/science/ch14/red-blood-cells.jpg', caption: 'Red blood cells, which carry oxygen' }
        ] }
      ],
      [
        { type: 'p', text: "White blood cells are the second solid part of the blood. They help the body fight infection. White blood cells do not contain hemoglobin, so despite their name, they have no real color. They can change shape as they move, and sometimes they even squeeze through the walls of blood vessels to reach infected parts of the body, where they surround and destroy bacteria and other harmful things." },
        { type: 'p', text: "Platelets are the third solid part of blood. They are not whole cells, but parts of cells that control bleeding, and like white blood cells they have no color — they are also much smaller than red blood cells. When you get a cut or scratch, it bleeds for a short time, but the platelets in the blood cause it to thicken and clot, which stops the bleeding. Without platelets to control bleeding, a person could bleed to death from a small cut." },
        { type: 'image-group', images: [
          { src: '/images/science/ch14/red-white-blood-cells-microscope.jpg', caption: 'Red and white blood cells seen through a microscope' },
          { src: '/images/science/ch14/platelets.jpg', caption: 'Platelets, which control bleeding' },
          { src: '/images/science/ch14/blood-clotting-diagram.jpg', caption: 'How platelets help blood clot' }
        ] }
      ],
      [
        { type: 'sidebar', text: "Do you know? On December 2, 1982, a medical milestone took place: the first permanent artificial heart was placed in a human being. Made of plastic and aluminum and built to run on electricity, it was named the Jarvik-7, after its inventor, Dr. Robert Jarvik. A 61-year-old man, Dr. Barney Clark, received the heart — without it, he would have died within a few hours. The artificial heart replaced the two diseased lower chambers of his heart and was attached to the two upper chambers. Dr. Clark lived 112 days with the artificial heart." },
        { type: 'image-group', images: [
          { src: '/images/science/ch14/artificial-heart-jarvik7.jpg', caption: 'The Jarvik-7, the first permanent artificial heart' }
        ] }
      ],
      [
        { type: 'heading', text: 'Circulation of Blood' },
        { type: 'p', text: "How does blood move through the body? The heart, the second main part of the circulatory system, is a strong, hollow muscle about the size of a fist, located in the center of the chest. As long as you are alive, your heart never stops working — a normal heart beats about 70 to 80 times per minute." },
        { type: 'p', text: "There are four hollow chambers, or cavities, in the heart. Each upper chamber is called an atrium — there is a right atrium and a left atrium — and blood collects in these thin-walled chambers. Each lower chamber is called a ventricle, and there is a right ventricle and a left ventricle; ventricles have thick, muscular walls and are the pumping chambers of the heart. Between the upper and lower chambers is a flap of tissue that acts as a valve, keeping blood from flowing backward." },
        { type: 'image-group', images: [
          { src: '/images/science/ch14/heart-chambers-diagram.jpg', caption: 'The four chambers of the heart' }
        ] }
      ],
      [
        { type: 'p', text: "There are three kinds of blood vessels: arteries, veins, and capillaries. An artery is a thick-walled blood vessel that carries blood away from the heart, usually blood that is rich in food and oxygen. A vein is a blood vessel that carries blood back to the heart from the body's cells, usually carrying mostly waste products. A capillary is a tiny blood vessel that connects an artery and a vein — capillaries are the smallest blood vessels in the body, and they allow food, oxygen, and wastes to pass directly between the blood and the cells." },
        { type: 'image-group', images: [
          { src: '/images/science/ch14/vein-artery-capillaries-diagram.jpg', caption: 'Arteries, veins, and capillaries' }
        ] }
      ],
      [
        { type: 'p', text: "Here is the path blood takes through the circulatory system. Blood that has just left the lungs, rich in oxygen, arrives in the left atrium. It passes through a valve into the left ventricle, from where it is pumped into a large artery. That artery branches into smaller and smaller arteries that reach all parts of the body. Blood from the arteries then enters the capillaries, where food and oxygen pass through the capillary walls into the cells, while carbon dioxide and waste products from the cells pass the other way, into the blood." },
        { type: 'p', text: "From the capillaries, blood enters the smallest veins and flows into larger and larger veins, eventually reaching the largest veins, which return blood — now poor in oxygen — to the right atrium. From there it passes through a valve to the right ventricle and is pumped into a large artery leading to the lungs. In the lungs the blood loses carbon dioxide and picks up a fresh supply of oxygen, then returns through veins to the left atrium, and the whole cycle begins again." },
        { type: 'image-group', images: [
          { src: '/images/science/ch14/path-of-blood-diagram.jpg', caption: 'The path blood takes through the circulatory system' }
        ] }
      ],
      [
        { type: 'heading', text: 'Diseases and Care of the Circulatory System' },
        { type: 'p', text: "What are some circulatory problems? Severe cuts can cause a serious loss of blood. The best way to stop bleeding is to apply direct pressure to the wound with a clean cloth, then cover it with a bandage to prevent infection — a large, deep cut should be checked by a doctor. The best way to stop a nosebleed is to hold the head straight and pinch the nostrils together; a severe nosebleed may need to be treated by a doctor." },
        { type: 'image-group', images: [
          { src: '/images/science/ch14/applying-direct-pressure.jpg', caption: 'Applying direct pressure to stop bleeding' },
          { src: '/images/science/ch14/bleeding-finger.jpg', caption: 'A cut that needs a bandage' },
          { src: '/images/science/ch14/treating-nosebleed.jpg', caption: 'Treating a nosebleed' }
        ] }
      ],
      [
        { type: 'p', text: "Each of the three main parts of the circulatory system can become diseased. For example, fat may build up in the walls of arteries, clogging them much like mineral buildup clogs a water pipe. The drawings show how clogged arteries and clogged pipes are alike." },
        { type: 'image-group', images: [
          { src: '/images/science/ch14/artery-vs-pipe-diagram.jpg', caption: 'Normal artery vs. clean pipe, clogged artery vs. clogged pipe' },
          { src: '/images/science/ch14/normal-artery-photo.jpg', caption: 'Normal artery' },
          { src: '/images/science/ch14/clogged-artery-photo.jpg', caption: 'Clogged artery' }
        ] },
        { type: 'p', text: "A heart attack, a common and serious heart problem, occurs when the supply of blood to part of the heart is cut off — usually because the arteries that carry blood to the heart are clogged. If the blood supply is cut off too long, the heart can be permanently damaged, and a person can die from a heart attack; it is a leading cause of death in the United States." },
        { type: 'p', text: "High blood pressure is another serious problem. Blood flowing through the arteries presses against the artery walls, and this pressure is called blood pressure. It can be measured with a special device. The picture shows a person having his blood pressure tested. When it is too high, the heart has to work harder than it should, though high blood pressure can often be controlled with medicine." },
        { type: 'image-group', images: [
          { src: '/images/science/ch14/taking-blood-pressure.jpg', caption: 'Taking blood pressure' }
        ] }
      ],
      [
        { type: 'p', text: "A longer and healthier life can be enjoyed by people who take care of themselves. Foods high in fat can clog the arteries, which makes the heart work harder and can also cause high blood pressure — so it is a good idea to eat foods that are low in fat and to watch your diet to avoid becoming overweight." },
        { type: 'image-group', images: [
          { src: '/images/science/ch14/checking-weight.jpg', caption: 'Checking weight' },
          { src: '/images/science/ch14/low-fat-foods.jpg', caption: 'Low-fat foods' }
        ] },
        { type: 'p', text: "Exercise is also important for a healthy circulatory system. Like other muscles, the heart benefits from exercise — making it work harder helps make it stronger. Exercise such as swimming, jogging, and jumping rope is good for the heart." },
        { type: 'image-group', images: [
          { src: '/images/science/ch14/runners.jpg', caption: 'Runners' }
        ] }
      ],
      [
        { type: 'activity', text: "Hands-on: How does exercise affect the pulse rate? Materials: stopwatch or wristwatch with second hand. Procedure: A. Work with a partner. Sit quietly and find your pulse as shown. Hold your index finger and middle finger against your wrist at the base of the thumb. Press firmly. Make sure you can feel the pulse. B. Take your pulse for 1 minute. Have your partner tell you when 1 minute has passed. Record your pulse. 1. What was your pulse rate? C. Take and record your pulse rate two more times. Find and record the average rate. (Add the three readings and divide by 3.) 2. What was your average pulse rate? D. Jog in place for 1 minute. Then take your pulse rate again. 3. What is your pulse rate after jogging? E. Take your pulse rate after jogging two more times. Be sure there is a rest period before each 1-minute period of jogging. F. Record your pulse rate after jogging. Find and record the average pulse rate after jogging. 4. What is your average pulse rate after jogging? How does it differ from your average pulse rate while sitting quietly? Conclusion: 1. When is your pulse rate greater, while sitting or after jogging? 2. What is the difference between the average sitting pulse rate and the average jogging pulse rate?" }
      ],
      [
        { type: 'heading', text: 'The Respiratory System' },
        { type: 'p', text: "How does air move in and out of the lungs? A healthy person can live several weeks without food and a few days without water, but only a few minutes without air — a constant supply of air is necessary for life." },
        { type: 'p', text: "When you breathe, air enters your body through your respiratory system, another of the body's transport systems, which works closely with the circulatory system to put the oxygen in the air you breathe to use. Recall that oxygen from the air is needed by living cells to release energy from food — this combining of oxygen with food is called respiration, and it also produces carbon dioxide and water as byproducts. The respiratory and circulatory systems work together to carry out this process." }
      ],
      [
        { type: 'p', text: "Here is how oxygen in the air travels from outside the body to the cells inside. When a person breathes in, air enters the nose, travels to the throat, and then enters a soft tube ringed with cartilage — the windpipe, or trachea. The voice box, or larynx, sits at the top of the trachea, and air passing through it lets a person make sounds for speaking or singing. The trachea then divides into two tubes called the bronchial tubes, which lead to the lungs." },
        { type: 'p', text: "The lungs are made of spongy tissue, and inside them the bronchial tubes divide many times into smaller and smaller branches — the smallest is thinner than a human hair." }
      ],
      [
        { type: 'p', text: "At the ends of the tiniest branches in the lungs are the air sacs, which look something like a bunch of grapes and have very thin walls. Each sac is surrounded by a capillary, and gases can pass between the sacs and the capillaries. Every time a person breathes in, the air sacs fill with air, and oxygen from that air leaves the sacs and enters the blood through the capillaries." },
        { type: 'p', text: "The oxygen that reaches the body's cells is used to break down food, releasing energy — and carbon dioxide is released from the cell as a waste product. That carbon dioxide passes into the blood, is carried to the lungs, and passes from the capillaries into the air sacs. When a person breathes out, it moves from the air sacs to the bronchial tubes and out to the outside air." }
      ],
      [
        { type: 'p', text: "The diaphragm is a thick sheet of muscle at the bottom of the chest cavity. It moves down when a person breathes in, spreading the ribs and letting the lungs expand — this process is called inhaling. When a person breathes out, the diaphragm moves up and the ribs come together, pushing air out of the lungs — this process is called exhaling." },
        { type: 'activity', text: "Try this: How does the diaphragm help to fill up the lungs? You will need a 2-L plastic bottle, two round balloons, scissors, and 2 rubber bands. Cut the bottle in half. Place one of the balloons through the opening of the bottle. Stretch the balloon opening over the bottle opening. Hold the balloon in place with a rubber band. Think of this balloon as the lungs. Cut the neck off the other balloon. Stretch this balloon across the bottom of the bottle. Hold the balloon in place with a rubber band. Think of this balloon as the diaphragm. Pull down on the stretched balloon. What happens to the balloon inside the bottle? Explain how this action is like that of the lungs and the diaphragm." }
      ],
      [
        { type: 'activity', text: "Hands-on: How much air do your lungs hold? Materials: large empty plastic milk jug with cap / plastic dishpan / rubber tubing / drinking straw / masking tape / grease pencil / graduate. Procedure: A. Work with a partner. Place a piece of masking tape on a plastic milk jug from top to bottom as shown. B. Fill the jug with water. Screw the cap on the jug. Fill a dishpan about one third full of water. Place the jug upside down in the water. Carefully remove the cap. Do not let air bubbles enter the jug. C. Ask your partner to hold the jug so that it does not tip over. Place one end of the tubing inside the jug. Put a straw in the other end of the tubing. Take a deep breath and blow through the straw. 1. What happens to the water in the jug? 2. Where did the air in your lungs go? D. Replace the cap on the jug. Do not let any extra water out of the jug. E. Remove the jug from the dishpan. Turn the jug right side up. Mark the level of water on the tape. F. Use a graduate to fill the jug with water. 3. How much water did you add? What does this water represent? G. The amount of water you just added to the jug is equal to the amount of air you blew into the jug. 4. How much air did you blow into the jug? H. Repeat steps B-F two more times. Take an average of the three volumes of air collected. 5. What was the average volume of air blown into the jug? Conclusion: How much air do your lungs hold?" }
      ],
      [
        { type: 'heading', text: 'Diseases and Care of the Respiratory System' },
        { type: 'p', text: "What are some common respiratory diseases? Colds are among the most common diseases of the respiratory system, and they spread easily from person to person. Every time someone sneezes or coughs, germs are sprayed into the air, and people nearby may breathe them in. Always cover your nose and mouth when you sneeze or cough, and always wash your hands." },
        { type: 'p', text: "An allergy is a strong reaction to a substance that is not normally in the body, such as plant pollen or dust. These substances often enter the body through the respiratory system and can cause sneezing, headaches, or difficult breathing — many people, for instance, are allergic to ragweed pollen." },
        { type: 'image-group', images: [
          { src: '/images/science/ch14/ragweed.jpg', caption: 'Ragweed — a plant that causes allergies' }
        ] }
      ],
      [
        { type: 'p', text: "Bronchitis is another respiratory disease, in which the bronchial tubes become red and swollen; it can sometimes lead to other diseases of the lungs." },
        { type: 'p', text: "Lung cancer is another disease of the respiratory system, with several causes — one is breathing polluted air, and another is smoking cigarettes. The pictures show a lung from a person who did not smoke and a lung from a smoker. Over half the people with lung cancer smoked, which is why every package of cigarettes must carry a warning label." },
        { type: 'image-group', images: [
          { src: '/images/science/ch14/warning-labels-cigarettes.jpg', caption: 'Warning labels on cigarettes' },
          { src: '/images/science/ch14/healthy-lung.jpg', caption: 'Healthy lung' },
          { src: '/images/science/ch14/smokers-lung.jpg', caption: "Smoker's lung" }
        ] },
        { type: 'p', text: "Regular exercise is important for a healthy respiratory system. Strenuous exercise strengthens the diaphragm, and a stronger diaphragm allows a person to take in more air — with more air in the lungs, more oxygen can reach the body's cells, letting them release energy from food more effectively." },
        { type: 'image-group', images: [
          { src: '/images/science/ch14/exercising-good-health.jpg', caption: 'Exercising for good health' }
        ] }
      ],
      [
        { type: 'heading', text: 'The Excretory System' },
        { type: 'p', text: "What waste products are removed by the excretory system? The excretory system is the transport system that removes waste products from the body — the unwanted materials left over from life processes such as respiration. Living things will die if they do not get rid of these waste products." },
        { type: 'p', text: "Many body parts help remove waste. The kidneys are among the main organs of the excretory system, but the lungs and skin also play a part. The lungs get rid of carbon dioxide and some moisture every time a person exhales. The skin is also part of the excretory system — one layer of skin contains sweat glands, and when a person sweats, water carrying many waste materials leaves the body, ridding it of extra water and wastes." },
        { type: 'image-group', images: [
          { src: '/images/science/ch14/replacing-lost-fluids.jpg', caption: 'Replacing lost fluids' },
          { src: '/images/science/ch14/layer-of-skin-diagram.jpg', caption: 'A layer of skin, showing sweat glands' }
        ] }
      ],
      [
        { type: 'p', text: "Most of the waste water in the body is removed by the kidneys. A person normally has two kidneys, located in the lower back, one on each side of the backbone. The drawing shows where the kidneys are located." },
        { type: 'image-group', images: [
          { src: '/images/science/ch14/xray-of-kidneys.jpg', caption: 'X-ray of kidneys' },
          { src: '/images/science/ch14/excretory-system-diagram.jpg', caption: 'The excretory system, showing the kidneys, vein, artery, and bladder' }
        ] },
        { type: 'p', text: "All the blood passes through the kidneys, and as it does, they filter out waste materials and excess water. These dissolved wastes and water are carried through small tubes to the bladder for storage, and finally leave the body as urine — water with wastes and salts dissolved in it. Solid human waste, by contrast, is removed by the large intestine, which is part of the digestive system." },
        { type: 'p', text: "If the kidneys become diseased, they may stop working properly, and harmful waste products can build up in the body. People with diseased kidneys can use a special machine to filter wastes from the blood — these machines have saved many lives." },
        { type: 'image-group', images: [
          { src: '/images/science/ch14/kidney-machine.jpg', caption: 'Person using a kidney machine' }
        ] }
      ],
      [
        { type: 'p', text: "To keep the excretory system healthy, a person should drink several glasses of water each day, to replace the water that is lost as waste products are removed. Water is also supplied to the body by foods such as milk, soup, juice, and juicy fruits and vegetables." }
      ],
      [
        { type: 'summary', text: "The transport systems of the body are the circulatory system, the respiratory system, and the excretory system." },
        { type: 'summary', text: "The blood, the heart, and the blood vessels are parts of the circulatory system." },
        { type: 'summary', text: "The circulatory system carries food and oxygen to cells and carries away wastes. It also protects the body from disease." },
        { type: 'summary', text: "The nose, the trachea, the bronchial tubes, the lungs, and the air sacs are parts of the respiratory system." },
        { type: 'summary', text: "The respiratory system brings oxygen into the body and removes carbon dioxide and some water." },
        { type: 'summary', text: "The parts of the excretory system include the kidneys, the skin, and the lungs." },
        { type: 'summary', text: "The excretory system gets rid of waste products." }
      ],
      [
        { type: 'review', title: 'Reviewing the Chapter', sections: [
          {
            heading: 'Science Words',
            instructions: 'Identify each of the following.',
            items: [
              { prompt: "A type of blood vessel with thin walls that carries blood from the body cells back to the heart. What is it?", answer: "Vein" },
              { prompt: "A thick sheet of muscle found at the bottom of the chest cavity that helps in breathing. What is it?", answer: "Diaphragm" },
              { prompt: "One of the solid parts of the blood that helps fight infection. What is it?", answer: "White blood cell" },
              { prompt: "One of the body's transport systems, which carries food and oxygen to the body cells and defends the body against disease. What is it?", answer: "The circulatory system" }
            ]
          },
          {
            heading: 'Science Words — Matching',
            instructions: 'Match each definition to the term it describes.',
            items: [
              { prompt: "Lower chamber of the heart", answer: "ventricle" },
              { prompt: "Windpipe", answer: "trachea" },
              { prompt: "Cell that helps in clotting", answer: "platelet" },
              { prompt: "Waste formed of water and dissolved salts", answer: "urine" },
              { prompt: "Thick-walled blood vessel", answer: "artery" },
              { prompt: "Cell shaped like a doughnut without a hole", answer: "red blood cell" },
              { prompt: "Process of breathing out", answer: "exhaling" },
              { prompt: "Upper chamber of the heart", answer: "atrium" },
              { prompt: "Voice box", answer: "larynx" },
              { prompt: "Smallest blood vessel", answer: "capillary" }
            ]
          },
          {
            heading: 'Understanding Ideas',
            instructions: 'Sort these terms into the correct body system: kidneys, air sacs, bronchial tubes, skin, trachea, atrium, diaphragm, lungs, bladder, nose, ventricle, artery.',
            items: [
              { prompt: "Which terms belong to the circulatory system?", answer: "atrium, ventricle, artery" },
              { prompt: "Which terms belong to the respiratory system?", answer: "air sacs, bronchial tubes, trachea, lungs, nose, diaphragm" },
              { prompt: "Which terms belong to the excretory system?", answer: "kidneys, skin, bladder" }
            ]
          },
          {
            heading: 'Using Ideas',
            instructions: 'Try this on your own.',
            items: [
              { prompt: "Use clay, paper, or other material to make a model of the heart. Label the parts of your model.", answer: "Your model should show the right and left atrium, the right and left ventricle, the valves between the chambers, and the large arteries and veins connecting to the heart." }
            ]
          }
        ] }
      ]
    ]
  },
};
