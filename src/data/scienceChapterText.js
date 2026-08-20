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
        { type: 'p', text: "In the spring the weather becomes warm, and green plants begin to grow from the soil. In a few weeks many plants produce beautifully colored flowers. Flowers do more than add beauty to the world — they are an important part of the plant. Without flowers, many plants could not produce more of their kind." },
        { type: 'p', text: "Producing new plants is one special activity that green plants {{carry out}}. What are some other special activities of green plants? How do the parts of green plants help them {{carry out}} these activities? You will {{find out}} in this chapter." }
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
        { type: 'activity', text: "Hands-on: What do root hairs look like? Fold a damp paper towel in half inside a plastic bag and place a few radish or bean seeds on it. Seal and hang the bag so the seeds stay moist. Check the seeds each day — when the roots are about 3 cm long, carefully examine the fuzzy areas on them with a hand lens, then under a microscope. Describe what you see, and think about why it's helpful for a plant to have many root hairs." },
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
          { src: '/images/science/ch01/stem-cross-section.jpg', caption: 'Water-carrying and food-carrying tubes inside a stem' }
        ] }
      ],
      [
        { type: 'p', text: "Besides water, leaf cells need carbon dioxide to make food. Carbon dioxide is one of the gases in air. How does air get into a leaf? The underside of a leaf, seen through a microscope, has small openings called stomata. Air enters a leaf through these stomata." },
        { type: 'p', text: "Light energy is the third thing needed for leaf cells to make food. Most leaves are flat and thin, which allows light to reach the food-making cells inside the leaf." },
        { type: 'p', text: "To sum up how a plant gets materials for food making: water enters the roots and moves through the stem to the leaf; air, containing carbon dioxide, enters the leaf through the stomata; and sunlight striking the leaf provides the energy that leaf cells need to make food." },
        { type: 'image-group', images: [
          { src: '/images/science/ch01/leaf-veins-stomata.jpg', caption: 'Veins and stomata in a leaf' },
          { src: '/images/science/ch01/plant-materials-diagram.jpg', caption: 'How a plant gets materials for food making' }
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
          { src: '/images/science/ch01/leaf-cross-section.jpg', caption: 'Leaf cross section' }
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
          { src: '/images/science/ch01/photosynthesis-diagram.jpg', caption: 'Food making in a leaf' }
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
          { src: '/images/science/ch01/respiration-diagram.jpg', caption: 'Respiration in an enlarged root cell' }
        ] }
      ],
      [
        { type: 'heading', text: 'Producing New Plants' },
        { type: 'p', text: "How do flowers produce seeds? Some of the energy released by plants during respiration is used for reproduction — the process by which living things produce new living things of the same kind. Many green plants grow flowers. A flower is the reproductive part of a flowering plant." },
        { type: 'p', text: "Many flowers have three main parts: the petals, the stamen, and the pistil. Each part plays a role in reproduction." },
        { type: 'image-group', images: [
          { src: '/images/science/ch01/flower-parts-diagram.jpg', caption: 'Parts of a typical flower' },
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
        { type: 'activity', text: "Hands-on: What are the parts of a typical flower? Compare two different flowers — look at and smell their petals, then identify the stamens and pistil using a hand lens. Carefully take one flower apart: remove a stamen and look at its powdery pollen grains under a microscope, then use a straight pin to open the base of the pistil and examine the ovules inside with a hand lens." }
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
          { src: '/images/science/ch01/fertilization-diagram.jpg', caption: 'A pollen tube growing to an ovule' }
        ] }
      ],
      [
        { type: 'p', text: "The fertilized ovule becomes a seed containing a tiny young plant and stored food. The tiny young plant is called an embryo. When conditions are right, the embryo begins to grow — this growth of a plant embryo from a seed is called germination. As the embryo grows, it uses the food stored in the seed. Once it reaches a certain size, the young plant will make its own food by photosynthesis." },
        { type: 'image-group', images: [
          { src: '/images/science/ch01/bean-seed-cross-section.jpg', caption: 'Bean seed cross section' },
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
      ]
    ]
  }
};
