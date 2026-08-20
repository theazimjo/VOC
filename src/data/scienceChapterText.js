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
  },
  "Ch.02 · Invertebrates": {
    title: "Invertebrates",
    pages: [
      [
        { type: 'heading', text: "CLASSIFYING LIVING THINGS" },
        { type: 'p', text: "For a few minutes make a list of all the animals you can. How many animals did you think of? There are many different kinds of animals." },
        { type: 'p', text: "Did you think of a dog, a cat, and a horse? You probably did. The chances are you did not include a sponge, a clam, or an earthworm. But these are animals, too." },
        { type: 'p', text: "Think of a way to divide up your list of animals into groups. For example, you could group all large animals together and all small animals together. You could group all fast animals and all slow animals together. Putting animals into groups is one way to sort them out. Putting animals into groups makes them easier to study." },
      ],
      [
        { type: 'p', text: "Scientists who study animals classify (klas'a fl), or group, them. To classify is to arrange in Zebras, wildebeests, and springboks groups by features that are alike. Scientists classify animals by structure (struk'char). The struc- ture of an animal is the kind of body parts it has and the way these parts are arranged. One structure scientists look for in classifying animals is the backbone. The backbone is made up of many small bones called vertebrae (ver'te bra). Ver- tebrae are linked together to form the backbone." },
        { type: 'p', text: "Some animals have a backbone and some do not. Scientists have classified all animals into two large groups. One group is made up of animals with a backbone. An animal with a backbone is called a vertebrate (ver'te brit). The other group is made up of animals without a backbone. An animal without a backbone is called an invertebrate (in ver'te brit). In this chapter you will learn about invertebrates. Which animals in these pictures have a backbone? Which do not have a backbone?" },
      ],
      [
        { type: 'p', text: "What do you think of when you hear the word sponge? You may think of a pink or blue pad used to clean the dishes. That kind of sponge is made by people. A sponge is also an animal. A sponge is an invertebrate that has many cells. Almost all sponges live in oceans. A few live in freshwater streams and lakes. The orange sponge in the pic- ture lives in the Atlantic Ocean off the northeast coast of the United States." },
        { type: 'p', text: "Sponges do not have many of the parts we usually think of as animal parts. Most animals move about, but adult sponges stay in one place. They ’ are found attached to rocksor other objects at the bottom of the ocean. In fact, for many years scientists thought sponges were plants. Why do you think they did?" },
      ],
      [
        { type: 'p', text: "The structure of a sponge is simple. Its body is full of small holes called pores. The pores are connected to one another by narrow canals." },
        { type: 'p', text: "Special cells line the canals inside the sponge. Each cell has a threadlike part that whips back and forth. The moveijients of these threads send water through the body of the sponge. The water that passes through the sponge contains food and oxygen. Cells inside the sponge break down the food. The oxygen is used to release the energy in the food." },
        { type: 'p', text: "Sponges have many different shapes. Some are shaped like cups, some like fans, and others like vases. The shape of a sponge depends on its skeleton. The skeleton is the structure that sup- ports the body of an animal." },
      ],
      [
        { type: 'p', text: "The skeleton of some sponges is made up of hard material. But other sponges are made up of soft material. This soft skeleton is sometimes used in the home as a cleaning sponge or bath ’sponge. It is usually a light brown or yellowish color. It is not the same as the pink or blue sponge made by people. Are any sponges in your home from the soft skeleton of the animal?" },
        { type: 'p', text: "out How much water can a sponge hold? Get an animal sponge, a container of water, and a measuring cup. Soak the sponge in the water for about 5 minutes. Remove the sponge from the water. Squeeze the water into the measuring cup. Measure the volume of water that was in the sponge. Record this volume of water. How much water did the sponge hold? Why is a cleaning sponge made similar to an animal sponge?" },
      ],
      [
        { type: 'heading', text: "ANIMALS WITH STINGING CELLS" },
        { type: 'p', text: "The hydra, jellyfish, and sea anemone (a nem'ane) are also invertebrates. Like sponges, they do not have a backbone. Hydras live in freshwater ponds and streams. Most jellyfish and sea anemones live in oceans." },
        { type: 'p', text: "These animals are more complex than sponges. Their body is shaped like a hollow sac. The sac is open at one end. The hydra uses the opening in two ways. It is used for taking in food and for getting rid of wastes. The opening is surrounded by one or more rings of tentacles (ten'te kelz). A tentacle is a long, armlike part'. The picture shows a hydra with six tentacles around the opening." },
      ],
      [
        { type: 'p', text: "Hydras and jellyfish use their tentacles to catch small animals for food. Sea anemones catch food in the same way. The tentacles contain many stinging cells. A stinging cell is a special struc- ture used to help capture food. How does a stinging cell help capture food? When a small animal" },
        { type: 'heading', text: "HYDRA" },
        { type: 'p', text: "comes close, the stinging cells explode. The ex- plosion pushes tiny ppisonous threads into the victim. These threads prevent the animal from moving. They may even kill it. The animal is then pushed into the mouth by the tentacles and swallowed. The drawing at the bottom of page 32 shows how the hydra captures and eats a tiny ani- mal called a daphnia." },
      ],
      [
        { type: 'p', text: "Have you ever walked along a beach? Perhaps you have seen a clear blob floating in the water. This blob was a jellyfish. Jellyfish may have also washed up on the beach. If you stepped on a jellyfish, it could have given you a painful sting." },
        { type: 'p', text: "The Portuguese man-of-war is an animal similar to the jellyfish. It has tentacles and stinging cells. This is one animal that can be dangerous to people. A swimmer can be tangled in the tentacles. The stinging cells can cause a painful injury to the swimmer." },
        { type: 'p', text: "------------- WORMS -------------- What are the three main groups of worms?" },
        { type: 'p', text: "Scientists classify worms into three main groups. These groups are the flatworms, the roundworms, and the segmented (seg'men ted) worms. The structure of worms is more complex than that of sponges. It is more complex than the structure of the animals with stinging cells." },
      ],
      [
        { type: 'p', text: "The first group of worms is the flatworms. The flatworm is the simplest type of worm. Some live in streams and ponds. What is the shape of a flatworm's body?" },
        { type: 'p', text: "A common flatworm found in fresh water is the planarian (pie nar'e en). There are nerve cells in the head of the planarian. These cells act like a simple brain. Above this \"brain” are two sense organs. An organ is a body part that does a certain job. These two sense organs are called eyespots. Eyespots can sense light. Can you find the eyespots on these planarians?" },
        { type: 'p', text: "Planarians have a very unusual ability. They REGENERATION IN A PLANARIAN can regenerate (ri jen'e rat), or regrow, body parts that are missing. For example, if their tail is cut off, planarians grow a new tail. If their head is cut off, a new head will grow. They can also regenerate part of their body. If a cut is made down the center of the head, two heads will grow. Look at the drawings of what these amazing animals can do!" },
      ],
      [
        { type: 'p', text: "Most flatworms are parasites. A parasite (par's sit) is an animal or plant that depends on and harms another animal or plant. The animal or plant on which a parasite depends is the host. A parasite often depends on its host for food." },
        { type: 'p', text: "The tapeworm is an example of a flatworm that is a parasite. Tapeworms live in the digestive system of animals. A digestive (da jes'tiv) system is a group of body parts that breaks down food. A tapeworm does not have its own digestive system. The host animal does the eating and the digesting. The tapeworm takes in digested food through an opening in its body. It uses the host's food. The host loses weight and becomes weak. Some tapeworms may grow as long as 9 m." },
      ],
      [
        { type: 'p', text: "The second group of worms is the roundworms. A roundworm is a worm that has a long tubeshaped body with a digestive system. The diges- tive system is made up of a tube that has an opening at each end. Food is taken in through the mouth opening. Wastes leave through the other opening. The drawing shows the two openings in the roundworm's body. Most roundworms live in soil, where they eat dead plant and animal matter. Other roundworms are parasites that live in host animals. Dogs must be treated to get rid of roundworms." },
        { type: 'p', text: "The third group of worms is the segmented worms. A segmented worm is a worm whose body is divided into segments, or sections. The segments look like a series of little rings. These segments are clearly shown in the picture of the worm on the next page." },
      ],
      [
        { type: 'p', text: "Segmented worms are much more complex than flatworms or roundworms. A series of hearts pump blood through the worm's body. The blood travels in a system of closed tubes. Like roundworms, segmented worms have two body openings and a digestiv system." },
        { type: 'p', text: "The earthworm is the best-known segmented worm. Earthworms live inside tunnels in wet soil. Their body structure allows them to move easily through soil. Each segment, except the first and last, has four pairs of bristles (bris'elz). A bristle is a stiff, strong hair used for moving. You can see the bristles in the drawing of the earthworm. The earthworm also uses the bristles for clinging to the walls of the tunnels it lives in." },
      ],
      [
        { type: 'activity', text: "Materials earthworm / metric ruler / hand lens / paper towel / pan or tray Procedure A. Carefully hold the earthworm in one hand. Use a hand lens to examine the earthworm. Measure the length of the earthworm's body. 1. How long is the earthworm's body? B. Count the number of body segments. 2. How many segments does the earthworm have? C. Find the mouth. Find the light-colored swelling on the earthworm's body. It is about one third from the front end of the body. It is used in reproduction. D. Gently run your index finger over the segments. You should be able to feel bristles on the segments. Look at the bristles with a hand lens. 3. Draw the earthworm. Label its parts. E. Place a moist paper towel in a pan or tray. Place the earthworm on the towel. F. Watch the earthworm move on the towel. 4. How do the segments change? 5. How does the earthworm use its bristles? Conclusion 1. In your own words describe the parts of an earthworm's body. 2. Describe how the earthworm moves. Using science ideas Place the earthworm in a container of loose moist soil. Use a hand lens to observe the way it behaves in the soil..How migfct the earthworm's behavior be helpful to the soil and to plants growing in the soil?" },
      ],
      [
        { type: 'p', text: "— ANIMALS WITH SPINY SKIN ------ What are echinoderms, and how do they look?" },
        { type: 'p', text: "If you have ever been to the seashore, you may have seen some echinoderms (i ki'na dermz). An echinoderm is a spiny-skinned invertebrate that lives in the ocean. A spine is a sharp, pointy structure. The body of an echinoderm is hard and covered with spines. Some of these animals have short spines. Others have long spines. The pic- tures show some well-known echinoderms." },
        { type: 'p', text: "A common echinoderm is the starfish. Most starfish have five arms that come out from the center part of the animal. On the underside of each arm are two rows of tiny tube feet. A tube foot is a hollow structure with a sucker at the end. Most echinoderms have tube feet. The picture shows a closeup of the tube feet on a starfish." },
      ],
      [
        { type: 'p', text: "The starfish uses its tube feet to pull itself over the ocean floor. Tube feet also help the starfish Starfish Close-up of tube feel 39 get food. When a starfish finds a clam, it begins a kind of tug-of-war. The clam protects itself by tightly closing its two shells together. The starfish attaches its tube feet to both shells and begins pulling. It tries to pry the shells apart. Sometimes the tug-of-war goes on for a long time. But the starfish almost always wins." },
        { type: 'p', text: "Tube feet pulling open shellfish Starfish attacking shellfish The starfish eats both oysters and clams. So people who gather this seafood do not like starfish. In the past, these people tried to get rid of starfish by cutting them into pieces. They threw the pieces back into the ocean. Instead of solving their problems, they made them worse. Some of the starfish pieces grew into whole new starfish. Why did this happen? The starfish is an animal with a very unusual ability. Like the planarian, it can regenerate, .or regrow, body parts that are missing. When the pieces of starfish were thrown into the water, the number of starfish really got larger. Each piece grew into a whole new starfish. Regenerating body parts 40" },
      ],
      [
        { type: 'heading', text: "ANIMALS WITH A SOFT BODY" },
        { type: 'p', text: "What are mollusks, and how do they look?" },
        { type: 'p', text: "The clam and the Octopus belong to a group of animals called the mollusks (mol'asks). A mollusk is an invertebrate with a soft body. Some mollusks have two outer shells. Others live inside a one-piece shell or have no shell at all. Many mollusks live in the ocean. Others live in fresh water or on land." },
        { type: 'p', text: "The body of a mollusk is more complex than the body of an echinoderm. For example, the mollusk has the beginning of a true eye. The picture shows the eyes on the body of a scallop. Mollusks also have a more complex system for pumping blood. Blood is pumped through blood vessels into spaces in the animal's body." },
      ],
      [
        { type: 'p', text: "Scallop with liny blue eyes Clams, oysters, and scallops are two-shelled mollusks. The shells are held together by muscles. The muscles open and close the shells like a hinge. The two-shelled mollusks have a part called a foot. This foot, made of a strong muscle, is used for digging. It is also used for pulling the animal along the ocean floor. Notice the foot of the scallop in the picture." },
        { type: 'p', text: "Snails, and slugs are other common mollusks. Both have a large muscular foot. The foot gives off a layer of slime. Snails and slugs glide along on this layer of slime. The main difference between a slug and a snail is the shell. Usually slugs do not have a shell, while snails have a shell. The snail's shell protects it from enemies. When in danger, the snail can hide inside its shell. Some other mollusks in this group are limpets and periwinkles (per'e wing kalz). These two mollusks are shown in the pictures." },
      ],
      [
        { type: 'p', text: "There are two other common mollusks that have no shell. These mollusks are the squid and the octopus. Both have long tentacles. The tentacles are lined with suckers. These suckers help them to catch other animals for food. The squid and the octopus have an unusual way to protect Octopus and close-up of suckers themselves. They give off a cloud of dark liquid when they are in danger. This dark liquid, called ink, keeps them from being seen while they escape from their enemy." },
        { type: 'p', text: "Mollusks such as clams, oysters, and scallops are a source of food for many people. In some countries certain land snails are gathered and cooked for food. The abalone (ab a lo'ne) is an ocean snail that is gathered by divers. Its foot is so large that it is cut up and served as abalone steaks. Squid and octopus are also favorite foods of many people." },
      ],
      [
        { type: 'p', text: "There are invertebrates that produce pearls, Some oysters that live in tropical waters make pearls that are very valuable. Large, perfectly shaped pearls areas valuable as some of the most expensive diamonds. A pearl forms Inside the shell of an oyster when a grain of sand or other particle enters the shell. Cells inside the oyster's shell produce a material called nacre (nd'ker) that forms around the particle. Nacre is also called mother-of-pearl. The particle becomes coated by many thin layers of nacre. After several years, the particle is completely covered. A bright, shiny pearl has been formed." },
        { type: 'heading', text: "ANIMALS WITH JOINTED LEGS" },
        { type: 'p', text: "What are the four main groups of arthropods?" },
      ],
      [
        { type: 'p', text: "The arthropods (ar'thra podz) make up the largest group of animals. Some people think there may be as many as 10 million types. An arthropod is an invertebrate that has a segmented body and jointed legs. The body has two or three seg- ments. The number of jointed legs is used to divide the arthropods into groups. Can you find the three body segments on the pictures of the ant?" },
        { type: 'p', text: "jointed legs Segmented body of ont All arthropods have a hard outer covering. In some arthropods the covering is harder than in others. This hard outer covering is called the exoskeleton (ek so skel'a tan). It is like a skeleton on the outside of the animal's body. It protects the soft parts of the body. Arthropods also have well-developed sense organs and a head with special mouth parts." },
      ],
      [
        { type: 'p', text: "There are four main groups of arthropods. The first group includes millipedes and centipedes. A millipede looks very much Like a worm with many legs. The word millipede means \"thousand legs.” (Milli- means \"thousand\" and -pede means \"foot.\") Each segment of a millipede has two pairs of legs. The millipede is a harmless animal that eats plants. When in danger, it may curl up into a ball." },
        { type: 'p', text: "A centipede is also wormlike but has fewer legs than a millipede. The word centipede means \"hundred legs.\" (Centi- means \"hundred\" and -pede means “foot.\") Unlike a millipede the centipede eats other animals. It uses a pair of poison claws near its mouth to capture its food. With these claws the centipede can inject poison into another animal." },
      ],
      [
        { type: 'p', text: "The second group of arthropods includes shrimps, lobsters, and crayfish. Animals in this group are also called crustaceans (krus ta'shenz)." },
        { type: 'p', text: "Almost all the arthropods in this group live in water. Shrimps and lobsters live in the ocean. Crayfish live in fresh water. Crustaceans have five pairs of legs. Their exoskeleton is divided into two main parts. These arthropods move by muscles attached to their exoskeleton." },
        { type: 'p', text: "The third group of arthropods includes animals such as spiders, ticks, and mites. These animals have four pairs of legs. They also have two main body parts. Most spiders are harmless. In fact, many are useful because they kill insects that are problems for people. You probably have seen spider webs. Why do you think spiders make webs?" },
      ],
      [
        { type: 'p', text: "A few spiders, such as the black widow, are poisonous. Ticks and mites are parasites that live by sucking blood from other animals. Ticks are also very annoying to pets, such as dogs and cats." },
        { type: 'p', text: "The fourth and largest group of arthropods is made up of insects. There are more different kinds of insects than all other animals and plants. An insect is an arthropod that has three pairs of legs and a body that is divided into three parts. The three parts of the body are the head, the abdomen (ab'da men), and the thorax (thor'aks). The abdomen is the rear part of an insect's body. The thorax is the middle part of an insect's body. Wings and legs are joined to the thorax. The drawing shows the three main parts of an insect's body." },
      ],
      [
        { type: 'p', text: "Compound eyes of Insect Close-up of compound eye Insects have very unusual sense organs. Most adult insects have compound eyes. The compound eye has thousands of lenses, as you can see in the picture. It lets the insect see motion. For example, bees can see flowers moving in a slight breeze. But they cannot see the details of the flower." },
        { type: 'p', text: "An insect's head has two feelers, or antennae (an ten'e). The antennae help the insect smell and feel. Sometimes the antennae are used for tasting and hearing." },
        { type: 'activity', text: "Materials egg carton / 8 pipe cleaners / several small buttons / scraps of fabric / 8 Styrofoam balls, 4 each of 2 different sizes / glue / construction paper / felt-tip pens / twist-ties / scissors / clay Procedure A. Use your Imagination! Create your own insect. The insect does not have to look like any known insect. But it must have all the body parts needed by an insect. 1. How many body parts will your insect have? 2. How many legs will your insect have? B. You may use any of the materials supplied. You may bend and Iwist the pipe cleaners and the twist-ties. You may glue parts of the body together. 3. What are the names of the three parts of your insect's body? 4. To what parts of the insect's body are the legs attached? C. Try giving your insect special mouth parts. Decide whether you want your insect to chew, suck, or pierce with its mouth parts. 5. Is your insect beginning to look like any insect you have seen? Which one? D. Be sure you add antennae to your insect's head. 6. How does an insect use Its antennae? Conclusion 1. Insects have four common characteristics. What are they? 2. List all the parts of your insect. Next to each write what it does. Using science ideas Describe the type of surroundings where your insect might live." },
      ],
      [
        { type: 'p', text: "Insects have special mouth parts. These parts are formed for chewing, sucking, or piercing. The kind of mouth parts an insect has depends on the food it eats. For example, beetles and grasshop- pers eat leaves. Their mouths have parts that cut and chew. Butterflies and moths have mouth parts that suck up juices from flowers. Mosquitoes have mouth parts for piercing the skin and sucking blood." },
        { type: 'p', text: "Chewing mouth ports Sucking mouth ports ' Piercing mouth ports 51 An insect's body is covered with an exoskeleton. The exoskeleton does not grow as the insect grows. When the covering gets too small, the insect molts (molts). To molt is to shed the hard outer covering. The exoskeleton splits down the middle. The insect then works its way out. Once the old covering is shed, the insect forms a new exoskeleton." },
      ],
      [
        { type: 'p', text: "Insects are both harmful and helpful. Some insects feed on other insects that destroy crops. The ladybug.is an example of this type of helpful insect. Many insects are also an important source of food for fish, birds, frogs, and other animals." },
      ],
    ]
  },
  "Ch.03 · Vertebrates": {
    title: "Vertebrates",
    pages: [
      [
        { type: 'p', text: "Fish are vertebrates that live in water. They are cold-blooded animals. A cold-blooded animal is an animal whose body temperature changes with the temperature of the water or air around it. When the air or water around such an animal is cold, the animal becomes cold. A cold-blooded animal becomes warm when the air or water around it is warm." },
        { type: 'p', text: "The skeleton (skel'e tan) of a fish is simpler than that of other vertebrates. Most fish have skeletons made of bone. The shark and the sting- ray have skeletons made of cartilage (kar'ta lij). So some scientists believe that sharks and sting- rays are not true fish. Cartilage is a soft, bonelike material that bends. You can feel cartilage in the tip of your nose." },
      ],
      [
        { type: 'p', text: "Most fish are covered with scales. A scale is a flat bony structure. Scales cover the body of a fish and protect it. Fish also have fins. A fin is a struc- ture on a fish that helps it move through the water. The drawing shows the different fins on a fish. How many fins can you count on this fish?" },
        { type: 'p', text: "Almost all living things need oxygen. Animals that live on land get oxygen from the air. You may wonder how fish get oxygen under water. There is oxygen dissolved in the water. Fish take in the oxygen found in water through their gills. Gills are thin, feathery structures that are filled with blood. Fish use gills for breathing. To breathe, a fish takes water into its mouth. The water then flows over the gills. Oxygen from the water goes into the blood in the gills. The blood in the gills picks up a waste material from the rest of the fish's body. This waste material is carbon dioxide. The carbon dioxide passes through the gills and then out of the body into the water. This » is how the fish breathes under water." },
      ],
      [
        { type: 'heading', text: "DIFFERENT TYPES OF FISH" },
        { type: 'p', text: "seahorse Fish are found in both fresh water and salt water. They are found in many shapes and sizes. Some fish look very different from most other fish. The seahorse looks like a tiny horse. The eel has a long slender body and small scales." },
        { type: 'p', text: "Fish are a major source of food for people. For thousands of years fish have been gathered from streams, rivers, and oceans. Each year about 66 billion kg of fish are caught. This is enough to feed each person on earth about 17 kg of fish a What does a fish scale tell about the age of a fish? Each year a fish adds another ring to its scales. You can tell the age of a fish by counting the rings in its scales. You will need a hand lens and some fish scales. Look at the fish scales with a hand lens. Count the number of rings on one scale. How many rings are there? How old is the fish? Do all the scales you looked at have the same number of rings? Try looking at the scales of other fish." },
      ],
      [
        { type: 'heading', text: "AMPHIBIANS" },
        { type: 'p', text: "What are the main characteristics of amphibians?" },
        { type: 'p', text: "An amphibian (am fib'e an) is a cold-blooded vertebrate that lives part of its life in water and part on land. Frogs, toads, and salamanders are some common amphibians. The outside of an am- phibian's body is usually moist and slimy. Amphibians do not have scales." },
        { type: 'p', text: "Most adult amphibians live on land. They return to water to lay their eggs. A few amphibians spend almost their entire life in water. These include bullfrogs and some salamanders, such as mud puppies." },
        { type: 'heading', text: "SALAMANDER" },
        { type: 'p', text: "Most adult amphibians breathe through lungs. Lungs are organs through which animals get oxygen from air. The mud puppy does not have lungs. It has gills outside its body through which it can breathe under water. Amphibians with lungs cannot live completely in water. They must come to the surface to breathe air. Amphibians can also get oxygen through their skin." },
      ],
      [
        { type: 'p', text: "Amphibians such as frogs and toads go through several stages of growth during their life. Look at the drawings and follow the life of the frog. The frog lays its eggs in the water. Fishlike animals called tadpoles hatch from these eggs. Tadpoles live in water and have gills. As the tadpole gets older it grows a tail. At this stage the tadpole looks more like a fish. Then back legs and front legs form. Thp frog develops lungs and comes out on land. Adult frogs usually live on land and have lungs. Other amphibians go through stages of growth like this." },
        { type: 'p', text: "What are the main characteristics of reptiles?" },
        { type: 'p', text: "A reptile (rep'tU) is a cold-blooded vertebrate that has lungs and dry skin. Almost all reptiles have scales. Most reptiles live on land and lay eggs. Some give birth to live young. The eggs of reptiles are laid on land. These eggs have a tough covering that prevents the eggs from drying out on land." },
      ],
      [
        { type: 'p', text: "There are four main groups of reptiles. These are the alligators and crocodiles, the snakes, the lizards, and the turtles." },
        { type: 'p', text: "Pine snakes hatching from eggs Alligators and crocodiles make up one group of reptiles. They are large four-legged reptiles. They look alike, but their color and the shape of their snout help to tell them apart. Crocodiles are green and gray, while alligators are gray and black. Crocodiles have a more slender and pointed snout than do alligators. The two drawings show how the crocodile and the alligator are different. Can you tell them apart?" },
        { type: 'p', text: "Snakes make up the largest group of reptiles. They do not have legs, and their bodies are covered with thin scales. Snakes can be large or they can be small. The anaconda, from South America, can be more than 9 m long. The thread snake is only about 1 2 cm long." },
      ],
      [
        { type: 'p', text: "Snake eating mouse and snake's curved teeth Snakes have an interesting way of eating. They swallow their food whole. The picture shows a snake with a whole mouse in its mouth. Most of the things snakes eat are larger than their mouth. When a snake eats an animal larger than its mouth, the snake's lower jaw separates from the upper jaw. This allows the snake's mouth to open very wide. Also, the snake's teeth are curved backward. This makes it hard for an animal to escape from the snake's jaws." },
        { type: 'p', text: "Another group of reptiles is the lizards. There are many different kinds of lizards. Mhny live in deserts and other hot, dry areas. Lizards have claws on their toes, as shown in the picture. The body of a lizard is covered with scales." },
      ],
      [
        { type: 'p', text: "The chameleon (ka me'le an) is one of the most interesting lizards. Chameleons live in trees and catch insects for food. They can change color. These lizards can change from brown to green to gray. The chameleon in the picture is changing color. These changes help these animals to blend in with their surroundingsA How can this be helpful?" },
        { type: 'p', text: "Turtles make up the last group of reptiles. The body of a turtle is protected by a shell. When in danger, a turtle pulls its legs and head into its shell. How does this help it to survive? The turtles in the picture are box turtles. They can close their shells very tightly. Some turtles live on land. Others spend most of their time in water." },
      ],
      [
        { type: 'p', text: "What are the main characteristics of birds?" },
        { type: 'p', text: "Birds are warm-blooded animals that are covered with feathers. A warm-blooded animal is an animal whose body temperature stays the same even when the temperature of the air or water around it changes. Birds are vertebrates with lungs. Like reptiles, birds lay eggs. Their eggs are in a hard shell. Wings and feathers make birds different from other vertebrates. Most birds use their wings to fly. Some birds, such as penguins, have feathers and wings but cannot fly. Birds can be found living on land, in trees, and on water. What birds can be found on water?" },
        { type: 'p', text: "The bones and feathers of birds are made in a special way to help birds fly. The bones are hollow and light. The feathers have a hollow central shaft..This shaft makes feathers strong but light. Some large birds may have as many as 25,000 feathers. All birds lose and replace their feathers during a year. This regular loss of feathers is called molting." },
      ],
      [
        { type: 'p', text: "The major use of feathers is to help birds to fly. Feathers are also needed to keep birds warm. Some birds fluff their feathers when they are cold. This fluffing forms more air spaces between the feathers and helps to keep the birds warm. Ducks and geese have small fluffy feathers called down near their skin. Down traps air and helps to keep the birds warm. Perhaps you have a jacket or blanket filled wilh down. These small feathers Because birds are very active animals, they need a great deal of energy. So they eat a lot of food. Some birds spend most of their life hunting for food. The diet of birds is varied. Some birds eat nuts, while others eat seeds. Birds such as the on6 shown above eat oysters. Birds living near the water sometimes eat fish that they spear with their beaks. Still others, such as ducks and the flamingo below, eat tiny water plants and animals." },
      ],
      [
        { type: 'p', text: "Birds show a great variety in nests and nest building. The nests of some birds are built by the male bird. Others are built by the female bird. Still others are built by both male and female. Nests are of all shapes and sizes. Some nests, such as those of the weaverbirds, are extremely large. As many as 600 birds may work together to build huge nests. Nests can be made of twigs, leaves, or feathers. They can also be made of mud or other substances that birds find. Nests can hang from tree branches or rest on the ground. Some nests are even built under piles of rotting leaves." },
      ],
      [
        { type: 'p', text: "Some birds can be harmful to people. For example, pigeons c n carry diseases that harm people's lungs. Pigeons are also pests because they damage buildings." },
        { type: 'activity', text: "What is the structure of a bird's feather and a bird's bone? Materials bird feather / scissors / hand fens / chicken bone / pliers / beef bone Procedure A. Look at the drawing of the bird feather on this page. Point out the central shaft and the side branches. Each side branch is called a barb. B. Look at a bird feather. Find the central shaft. Use scissors to cut through the central shaft. 1. Is the central shaft hollow or solid? C. Find the barbs on the feather. Gently pull some of the barbs apart, then put them together by pulling them through your fingers. 2. Why do you think the barbs can be locked to- gether? D. ’Look at the feather with a hand lens. Draw the feather as you see it through a hand lens. E. Look at a chicken bone. Break It In half with pliers. 3. Describe what you see inside the chicken bone. F. Compare the chicken bone with the beef bone. 4. What are the differences between the chicken bone and the beef bone? Conclusion 1. Describe a few important features of a feather and a chicken bone. What features of a bird's feathers and bones help it to fly? 2. Why is a beef bone not suitable for flight?" },
      ],
      [
        { type: 'p', text: "------------ MAMMALS ------------- What are the main characteristics of mammals?" },
        { type: 'p', text: "The most complex group of vertebrates is the mammals. A mammal is a warm-blooded vertebrate that is usually covered with fur or hair. Mammals are different from other vertebrates in two main ways. First, the body of a mammal is all or partly covered with fur or hair. A very hairy mammal is the gorilla. A mammal with just a small amount of hair is the elephant." },
        { type: 'p', text: "A second way mammals differ from other vertebrates is that all mammals produce milk for their young. The picture shows springer spaniel puppies getting milk from their mother." },
        { type: 'p', text: "Springer spaniel and pups Mammals differ from each other in many ways. Most mamm.als live on land. A few mammals, such as whales and dolphins, live in water. There are great differences in the size of mammals. The blue whale is the Icfrgest mammal. It can grow to be as long as 32 m and have a mass of over" },
      ],
      [
        { type: 'sidebar', text: "110,000 kg. The common shrew is one of the smallest mammals. It is only about 10 cm long and has a mass of less than 3 g. These tiny mammals are insect eaters. * Do you know? Suppose you find an animal that looks like this: It has a duck's bill and webbed feet. It has a tail like a beaver and fur on its body. It feeds its young milk. Strangely, it also lays eggs. How would you classify this animal? Is it a bird? Is it a reptile? Is it a mammal? This strange animal is an egg-laying mammal. It is called a duck-billed platypus (plat' e pas). The platypus lives In and around Australia." },
      ],
      [
        { type: 'p', text: "The young of most mammals develop inside the mother's body. Some mammals produce a large number of young at one time. For example, mice may give birth to as many as eight to ten young. Large mammals, such as elephants, usually have only one baby. The time needed for the young to grow inside the mother's body is not always the same. It varies from one kind of mammal to another. Large mammals take longer to grow than small mammals. A small mammal such as a hamster grows in 16 days. A large mammal such as a giraffe takes about 442 days. Dogs take about 63 days to grow in the mother's body. Whales grow in about 450 days." },
      ],
      [
        { type: 'p', text: "Some mammal babies grow for a very short time inside the mother's body. When they are bom, they are not fully farmed. They are very small and helpless. They crawl into the mother's warm pouch and continue to grow there. The kangaroo and the opossum are mammals whose young develop in a pouch. The picture shows tiny opossum babies feeding inside their mother's pouch and a kangaroo with its young." },
        { type: 'p', text: "Opossums feeding Kangaroo with young Some mammals are important to people. These are the mammals that are used for food and other products. Cattle, pigs, and sheep are raised for meat. Foods such as cheese, cream, and butter come from the milk produced by cows. Belts, shoes, footballs, and leather coats are products made from mammal skins." },
      ],
      [
        { type: 'p', text: "Some mammals can be harmful to people. Rats are harmful mammals. Rats spread disease to humans. Often rats will eat stored food, such as fruits and grains. Millions of dollars are lost each year because of damage from rats." },
        { type: 'activity', text: "of vertebrates? Materials 5 small index cards l wire coat hanger I yarn / drawing paper / scissors / transparent tape / felt-tip pens or crayons / old magazines Procedure A. You are going to make a mobile showing how the vertebrates are grouped. Write the names of the five main groups of vertebrates on index cards. Using the yarn, attach the cards to the coat hanger as shown. 1. What are the five main groups of vertebrates? B. Cut five strips of drawing paper. On these strips list the main characteristics of each group of vertebrates. C. Using the yarn, attach the lists to the right cards. 2. Did you find any characteristics that ap- peared in more than one group? 3. What are these characteristics? In which D. Below the list of characteristics, hang pictures of animals from each group. You may either draw the animals or cut pictures of animals out of magazines. Attach the pictures with yarn as shown. Conclusion What do all five groups of vertebrates have in common? Using science ideas You can use your mobile to play a science game called \"The Vertebrate Detective.\" Think of one of the animals hanging on the mobile. On an index card list five characteristics of this animal. Read these characteristics one at a time to the class. Have membersof the class guess the animal you are thinking of." },
      ],
    ]
  },
  "Ch.04 · Living Communities": {
    title: "Living Communities",
    pages: [
      [
        { type: 'heading', text: "THE LIVING AND NONLIVING" },
        { type: 'p', text: "All living things are surrounded by other living things. They are also surrounded by nonliving things. These living and nonliving things affect each other. Everything that surrounds and affects a living thing is called its environment (en vT'ran- ment). What are some living things in your home environment? What are some nonliving things? In what ways do these living and nonliving things affect each other? The study of how living and nonliving things affect each other is called ecology (e kol'e je). Scientists who study this subject are called ecologists." },
        { type: 'p', text: "Look at the picture of the fish tank. What living and nonliving things do you see? The living and nonliving things in the tank affect, or interact with, each other. Both the fish and the plants need water to survive. The plants give off oxygen, which goes into the water. The fish, which need oxygen to live, take the oxygen from the water. As they breathe, J:he fish give off carbon dioxide. The plants use the carbon dioxide to make food. Without the fish, the plants would die. And without the plants, the fish would die." },
      ],
      [
        { type: 'p', text: "The fish tank is an example of an ecosystem (e'ka sis tom). An ecosystem is a group of living things and their nonliving environment. An ecosystem includes all the ways the living things in a group interact with each other! It also includes the way living things interact with their An ecosystem can be as small as a single fish and a single plant in a fishbowl. Or an ecosystem can be as large as a forest, a desert, or an ocean. Look at the picture of the city park. The park is an qcosystem that may contain several smaller ecosystems. For example, under a rock you may find a small ecosystem that has many kinds of living things. A single tree in the park may be another ecosystem. The tree may be the home of squirrels, birds, and insects. Nongreen plants as well as green plants may also live on the tree." },
      ],
      [
        { type: 'heading', text: "LIVING THINGS IN ECOSYSTEMS" },
        { type: 'p', text: "You have learned that an ecosystem is made up of living and nonliving things. The living things in an ecosystem are known as a community (kemyii'ne te). A community is all the plants and animals that live and interact with each other in a place." },
        { type: 'p', text: "Communities are often named for the kind of place in which they live. There are forest, marsh, and pond communities. What are some other kinds of communities?" },
        { type: 'p', text: "Communities are made up of populations (popya la'shanz). A population is a group of the same kind of living thing in a community. For example, all the pine trees in this forest make up one population. It is a population of pine trees. Which picture shows a population of grass plants? What other populations are shown?" },
      ],
      [
        { type: 'p', text: "Members of the geese population can easily be seen in the picture of the marsh. What other animal populations live in a marsh? There are also many different plant populations in the marsh. The different populations in a community interact with each other. The geese feed on the marsh plants. When they feed on these plants, the geese make room for new plants to grow. The geese also release wastes into the soil. This enriches the soil and helps the new plants grow." },
        { type: 'activity', text: "Materials meterstick or metric tape / 4 sticks / 4.5 m of string / hand lens / 2 jars with lids / small shovel / white paper Procedure A. Choose a place outdoors to study. Measure a square area of ground 1 m on each side. Push four sticks into the ground to mark the four corners of your square. Tie string around the sticks to enclose the area. B. Study the area clo.sely for several minutes. Look for moving insects or other animals. Make a list of all the kinds of animals and plants that you see. Use a hand lens to help you see small plants and animals, 1. How many kinds of animals do you see? 2. How many kinds of plants do you see? C. Collect a sample of each kind of plant and animal you find. Put these samples in a jar. D. Use a small shovel to collect a sample of the soil. Put this sample in another jar. E. Pour the soil sample onto a sheet of white paper. Examine the sample with a hand lens. Look for living things. Look at the samples in the other jar. 3. What living things can you identify? Conclusion 1. What populations did you find in the ecosystem you studied? 2. In what ways might these populations affect each other? Using science ideas Suppose you studied this same area at another time of the year. How might this affect the number and kinds of populations you could see? Explain." },
      ],
      [
        { type: 'p', text: "Every living thing in a community has a special place in which it is usually found. The special place in a community in which a plant or animal lives is called its habitat (hab’a tat). You can think of an ecosystem as the neighborhood that a living thing is part of. The habitat can be thought of as its address in that neighborhood." },
        { type: 'p', text: "s Within a community there are many habitats." },
        { type: 'p', text: "In a forest the soil is the habitat of ants and earthworms. A rotten tree stump is the habitat of termites. Squirrels live in the trees. Mosses grow on the forest floor, in the shade of trees. Ants and earthworms, termites, squirrels, and mosses each have their own habitat. But these living things are all part of the same community." },
      ],
      [
        { type: 'p', text: "The populations and habitats in a desert are different from those in a forest. Look at the picture. The cactus plant is the habitat of the elf owl. The habitats of many other desert animals are burrows under the ground." },
        { type: 'p', text: "The habitat of a plant or animal supplies it with many of the things that it needs to survive. Some Living things are able to live in more than one habitat. Others can live in only one habitat. For example, flies can live in many habitats. They move to different places to get food. Mice can also live in more than one habitat. They are found in city buildings as well as in country fields." },
      ],
      [
        { type: 'p', text: "Some animals are very limited in their habitat. Trout can only live in cool streams. The koala (koa'le) of Australia eats only one kind of plant. It eats the leaves of the eucalyptus (yu ke lip'tes) tree. So the koala can only live where this kind of tree grows. Food also limits the habitat of the panda. It only eats bamboo. How many different habitats could you live in?" },
        { type: 'sidebar', text: "Do you know?. Panda populations are in danger. There may be only 1,000 pandas left in the wild. The reason for this is the amount of food available. Pandas live in forests in China where bamboo grows. Bamboo is the main food of pandas. The growth cycle of bamboo takes 100 years to complete. Every 100 years bamboo plants flower, produce seeds, and then die. It takes many years for new bamboo plants to grow. In the past, when bamboo plants died, pandas moved to other parts of the forests to find growing bamboo. But huge farms have been built in some parts of the forests. The pandas will not cross these farms. So they starve. In one case, farmers found the bodies of more than 130 starved pandas. Panda eating bamboo Many plants and animals share the same habitat. Earthworms share the soil with many plants. Termites share a rotten tree stump with ants and other insects. Birds share their tree habitat with squirrels. Although they share the same habitat, the way these animals live may be very different from each other. The role that each living thing plays in a habitat is called its niche (nich)." },
      ],
      [
        { type: 'p', text: "Some squirrels and birds share the same habitat. Yet these animals each have a different niche. Squirrels gather nuts and stay close to their habitat. Some birds are insect eaters. They travel great distances from their habitat to get food. Both animals share the same habitat. But Remote cardinal they do not have a great effect on each other." },
        { type: 'p', text: "Sometimes the niche of one population does affect other populations. A creek is the habitat of a population of beavers. The beavers build dams across the creek. The dams they build create ponds. The ponds become the habitat of fish and plants. The beavers also cut down many trees. How does this affect the tree population?" },
      ],
      [
        { type: 'heading', text: "CHANGES IN POPULATIONS" },
        { type: 'p', text: "What factors affect the size of a population?" },
        { type: 'p', text: "Ecologists study communities of living things. They try to find out what living things are present. They also want to know the size of each population. They try to learn whether the populations are changing in size. Ecologists want to know if populations are getting larger, getting smaller, or staying the same." },
        { type: 'p', text: "Ecologist studying □ bird population When an animal population changes in size, it often means there is a change in the birth rate or the death rate. The birth rate is the number of animals that are born in a period of time. What is the death rate? Many factors can cause a change in the birth rate or the death rate." },
      ],
      [
        { type: 'p', text: "Why might the birth rate of a population go up? Suppose a deer population has a large supply of food and water. Deer eat plants. If the deer are healthy, many will live long enough to produce young deer. So the birth rate will go up." },
        { type: 'p', text: "As the birth rate goes up, the deer population will get larger. After a while, the kinds of plants that deer eat will be scarce. Some deer may move away in search of food. What will this do to the size of the deer population? The deer that stay will still have little food. Some deer will get sick and die. Other deer may become very weak. They may be unable to run from other animals that hunt them for food. Young male white-tailed deer eating The size of a population may also change because of a sudden change in the amount of food that can be found. Suppose a fire or a disease destroys the deer's food source. Then the death rate of the deer population would go up. As the death rate goes up, population size goes down." },
      ],
      [
        { type: 'p', text: "Lynx and snowshoe rabbit The size of a population may also be affected by the presence of a predator (pred'a tor). A predator Is an animal that hunts other animals for food. The animal that is hunted is the prey (pra). The picture shows a predator with its prey. The predator is a lynx (lingks). A lynx is a small catlike ’ animal. The prey is a snowshoe rabbit. Both ani- mals live in the United States and Canada." },
        { type: 'p', text: "Suppose the number of snowshoe rabbits goes up. Then the number of lynx goes up, too. This is because the lynx now have a larger food supply. But an increase in the lynx population means more rabbits will be eaten. After a while, there will be very few rabbits left. With less food, many of the lynx will starve to death. This decreases the number of lynx. What will then happen to the size of the rabbit population? •» 93" },
      ],
      [
        { type: 'activity', text: "Materials metric ruler / buttons Procedure A. Draw a grid such as the one shown. Each box should be 2 cm on a side. There should be six squares across and six squares down. The grid represents a forest. B. Suppose each box represents the amount of space, food, and water needed by one deer. Use buttons to represent deer. Begin with two deer. Put each deer into a different box on the grid. C. Imagine that a year has passed. The deer population has doubled in size. Add the correct number of buttons to the grid. 1. How many deer are there now? D. Another year passes and the deer population has doubled again. Add the correct number of buttons to the grid. 2. How many deer are there now? E. The next year three deer die of disease. Remove three buttons. Then the remaining deer population doubles once again. Add the correct number of buttons to the grid. 3. How many deer are there now? 4. Suppose that from now on, the deer popu- lation doubles each year and no more deer die. In how many more years will there be too many deer for the amount of space, food, and water in the forest? Conclusion 1. What is the greatest number of deer that could live In the forest? 2. What are some reasons for a decrease in the size of a population?" },
      ],
      [
        { type: 'heading', text: "CHANGES IN COMMUNITIES" },
        { type: 'p', text: "You learned that a sudden major change, such as a fire, can affect the size of populations. Sudden changes can also affect whole communities." },
        { type: 'p', text: "On May 18, 1980, a volcano in Washington erupted. The volcano, Mount St. Helens, ex- ploded with great force. The force was equal to almost 10 million metric tons of dynamite. One picture shows how the area looked before the blast. The other shows the same area 4 months Mount St. Helens before the eruption Mount St. Helens 4 months otter the eruption 95 after the blast. Millions of trees were blown down. Many plants were burned or covered with layers of ash as much as 180 m deep. Scientists believe that thousands of bear, deer, and other animals lost their lives. Few living things in the area survived." },
      ],
      [
        { type: 'p', text: "A fire destroyed many square kilometers of the forest below. Trees, shrubs, grasses, and other plants were burned in the fire. Many animals were also killed. Among these were snakes, lizards, rabbits, and baby birds. Some animals were able to escape the fire, and so they lived. But many of the animals that lived lost their food sup- People also cause changes in communities. The picture shows a major change in a redwood forest. People are cutting dovfln the trees to use the wood. What changes might result from clearing the trees in this forest? In what ways are these changes like the changes from a forest fire? What are some living things that will lose their habitat?" },
      ],
      [
        { type: 'p', text: "What changes have occurred in your environment? Interview some adults who have lived in your neighborhood for a long time. Find out what the area was like many years ago. What changes have there been? Find out whether each change was brought about by people or was a natural change." },
        { type: 'p', text: "Ask about the kinds of plants and animals that lived in the neighborhood. Find out how these living things were affected by each change. Be sure to ask about the effect that the changes might have had on people." },
        { type: 'p', text: "What happens after a sudden major change destroys an ecosystem? The same community does not come back right away. It may take 100 or more years for it to return. During this time there are many changes in the kinds of living things in an ecosystem. The series of changes in the communities of an ecosystem is called succession (sek sesh'en)." },
      ],
      [
        { type: 'p', text: "These drawings show succession in a forest after a fire." },
        { type: 'p', text: "1 . Before the fire a forest of beech and maple trees is the habitat of many living things. 2. A fire burns the trees and other plants. 3. Several years after the fire the area has be- come a field. There are grasses and other low plants. Insects, birds, groundhogs, and other animals live in the field. 4. In a few years shrubs and young trees grow. 5. The beech and maple trees reappear after 100 years. What animals live in the forest?" },
        { type: 'p', text: "Ecologists have found that there are different stages in the succession of any ecosystem. The first stage of succession is called the pioneer (pi anir') stage. What is the number of the drawing that shows the pioneer stage in the succession of the forest? This picture shows the beginning of the pioneer stage after the Mount St. Helens blast. New plants are growing out of the ash." },
      ],
      [
        { type: 'p', text: "The last stage in the process of succession is called the climax (klf'maks) stage. Which drawing shows the climax stage? The climax stage in a community is usually stable. This means that it rarely changes. What might cause it to change?" },
        { type: 'p', text: "Many times succession does not result from a sudden change. Succession is more often a natural process in an ecosystem. These drawings show succession in a pond community." },
        { type: 'p', text: "1 . Many kinds of plants and animals live in and around the pond. Each year some animals and many plants die and sink to the bottom. 2. After many years the remains of once-living things form soil and the pond fills in. 3. As the pond fills in, a marsh develops. The marsh plants grow and die. 4. In time the marsh dries up and a field devel- ops. Grasses and shrubs grow in the field. A few years later trees appear. 5. Finally a forest community develops. What is this last stage of succession called?" },
      ],
    ]
  },
  "Ch.05 · Building Blocks of Matter": {
    title: "Building Blocks of Matter",
    pages: [
      [
        { type: 'p', text: "Using a telescope or things that are very far away. They use microscopes to see very small objects. They use telescopes to study the stars. All the scientists in the pictures are gathering information about matter." },
        { type: 'p', text: "Scientists have learned that all matter is made of small particles. They have never seen these particles with the unaided eye. From the results of tests, scientists believe that the particles exist." },
        { type: 'p', text: "Scientists make guesses about many things they cannot test directly. They make guesses about what the inside of the earth is like. They make guesses about what the stars are made of. So far, scientists have not been able to drill into the center of the earth. They have not yet traveled to a star. But they have made guesses about the matter in these places." },
      ],
      [
        { type: 'p', text: "The guesses that scientists make are based on many careful studies. These studies give scientists clues about things that they cannot see or test directly. Indirect evidence (in da rekt' ev'a dans) is a set of clues that scientists use to make guesses about things they cannot see or test directly." },
        { type: 'p', text: "The picture shows two closed boxes. An umbrella is inside one box. A fish bowl is inside the other box. Guess which box holds the umbrella. You probably guessed box A. What clues did you base your guess on? These clues are indirect evidence of what is inside each box." },
        { type: 'p', text: "The girl in the picture cannot see what is in the box. By shaking the box, she is trying to find out what is inside. By holding the box in her hands, she is learning about its mass." },
      ],
      [
        { type: 'p', text: "As you have read, scientists use indirect evidence to find out about the world around them. They gather facts, or data, about things they can- not observe directly. Scientists use indirect evidence to learn about distant objects. They also use indirect evidence to study very small objects. Collecting indirect evidence" },
        { type: 'activity', text: "What can you learn from indirect evidence? Materials sealed box with unknown object / metric ruler / balance and masses / magnet Procedure A. Lift and shake the box. Use the balance to measure the object's mass. Move the magnet along the outside of the box. Measure the box. 1. What happens when you lift and shake the box? B. Gather all the information you can. Moke a chart like the one below. List each thing you did and what you learned. Result of shaking C. Study your chart. 2. From your information, what do you guess is in the box? D. Open the box and look inside. Compare your guess with what actually is in the box. 3. In what ways was your guess correct? 4. In what ways was it wrong? Conclusion You have just collected indirect evidence. What can you learn from indirect evidence? Using science Ideas List some other ways you can learn about the contents of a sealed box." },
      ],
      [
        { type: 'p', text: "Scientists have problems studying matter they cannot see. They use indirect evidence to make guesses about what matter is made of. They have found that all matter is made up of small par- ticles. Each particle is called an atom (at'am). An atom is the basic unit of all matter. Atoms are very small. Suppose a million of the smallest atoms were stacked on top of one another. The stack would not be as thick as this page." },
        { type: 'p', text: "Scientists must use indirect evidence to learn about atoms. Can you explain why? They use their indirect evidence to make models of atoms." },
        { type: 'p', text: "A model is a way to describe how something looks or acts. A model can be made of wood or clay. Or a model can be a picture. A model can even be words that describe an idea." },
      ],
      [
        { type: 'p', text: "Have you ever made a model of a ship, a plane, a house, or a car? The picture shows a model of an airplane. This model is much smaller than the real thing. But models of atoms are much larger than real atoms." },
        { type: 'p', text: "For many years scientists have been making models of the atom. What do the models show? Scientists think the atom hSs a central part called a nucleus (nii'kle as). The nucleus of an atom contains two kinds of particles, protons (prO'tonz) and neutrons (nii'tronz). Protons and neutrons are tightly packed together in the nucleus. Tiny particles called electrons (i lek'tronz) travel around the nucleus. The drawing shows a model of a hydrogen atom." },
      ],
      [
        { type: 'p', text: "An atom is almost all empty space. Suppose you were to make a model of a hydrogen atom. , The nucleus of the atom would be the size of an orange. The electrons would be in the space outside the orange. Then your model of the atom would be very large. It would be about 22 football fields across!" },
        { type: 'p', text: "The electrons in your model would be very small. They would each be smaller than the head of a pin. The electrons would be moving quickly all around the orange. This shows that in a real atom there is mostly empty space between the nucleus and the electrons." },
        { type: 'p', text: "What is an easy way to write the names of Some kinds of matter cannot be broken down into simpler kinds of matter. Suppose a silver bar is broken down into the smallest particle that is still silver. The smallest particle of the silver bar would be a silver atom. A silver atom cannot be broken down into a simpler kind of matter and still be silver." },
      ],
      [
        { type: 'p', text: "Silver is an element (el'o ment). An element is matter that is made up of only one kind of atom. It is a basic kind of matter. The smallest particle of an element is an atom." },
        { type: 'p', text: "Scientists have discovered 106 different elements. The atoms of these elements are different from one another. One way in which they differ is in the number of protons. Different atoms have different numbers of protons. For example, an atom of silver has 47 protons. An atom of gold has 79 protons. Of the 106 elements, 92 of these oc-" },
        { type: 'sidebar', text: "cur naturally on the earth. The other 14 elements have been made by scientists using special machines, The picture shows bjects made mainly of only one element. Can you name the elements that make up the objects in the picture? Each of the elements has its own symbol. A symbol is a short way to write the name of an element. The symbol stands for the name of the element. Why do scientists use symbols? They find it easier and quicker to write the symbol than to write the whole name of the element. Scientists all over the world use the same symbols. Do you know? Some of the elements were named in an interesting way. The element tungsten was dis- covered in Sweden and in Spain at the same time. In Sweden it was>found in a heavy yellow rock. The element was named tungsten. The name comes from two Swedish words. Tung means \"heavy\" and sten means \"stone.\" The Spanish scientists called the same element wolfram. It was found In a mineral called wolframite. Today in most parts of the world the element is called wolfram. In the United States it is called tungsten. But it is known by the symbol W. The picture shows a bulb with a tungsten filament." },
      ],
      [
        { type: 'p', text: "How can you group the elements? One way scientists group the elements is to put all metals in one group and all nonmetals into a second group. Most metals are good conductors of electricity and are shiny. Most nonmetals are poor conductors of electricity and are not shiny. Many nonmetals are gases. Which of the ob- jects shown here is made mainly of a metal? Which is made mainly of a nonmetal? Which of the elements in the following list are metals? Which are nonmetals? aluminum carbon helium lead nickel oxygen The table on page 121 lists some elements and their symbols. It describes how the elements look. Look at the list of symbols. You will see that sometimes the symbol for an element is the first letter of its name. For example, the symbol for carbon is C. Sometimes the symbol is two letters. For example, the symbol for calcium is Ca. A twoletter symbol is sometimes used because the names of some elements begin with the same letter. So the symbol Ca stands for calcium and the symbol Co stands for cobalt." },
      ],
      [
        { type: 'p', text: "Look at the symbol for iron. It is Fe. The word for iron in Latin is ferrum (fer'em). So the symbol for iron comes from that word. Find the symbol for silver. It is Ag. The word for silver in Latin is argentum (ar jen'tam). The symbol for silver comes from that word. The symbols for some other elements also come from their names in Latin and other languages. Find mercury in the table. It is an unusual metal. Is mercury a solid, a liquid, or a gas at room temperature? Helium-fllled balloons Diamond—a form of carbon Calcium Ca Silver-white metal Carbon C Black solid or colorless crystal Chlorine Cl Greenish-yellow poisonous gas Cobalt Co Silver-white metal Gold Au Heavy yellow metal * Helium He Light gas with no color, taste, or odor Hydrogen H Gas with no color, taste, or odor Iron Fe Gray-white metal Mercury Hg Heavy silver-colored metal; liquid at room temperature Nitrogen N Gas with no color, taste, or odor Oxygen O Gas with no color, taste, or odor Silver Ag Shiny white metal Sodium Na Soft silvery metal Sulfur S Powdery yellow solid" },
      ],
      [
        { type: 'heading', text: "MOLECULES AND COMPOUNDS" },
        { type: 'p', text: "You have learned that the smallest particle of matter is the atom. Atoms do not usually exist alone on earth. They combine, sometimes in pairs, sometimes in threes. Sometimes hundreds of atoms combine. New substances form when atoms of different elements combine. These new substances are called compounds (kom'poundz). The simplest particle of many compounds is a molecule (mol'a kyill). Most molecules are made of two or more atoms." },
        { type: 'p', text: "Sometimes two atoms of the same element combine to form a molecule. Think about these examples. Two atoms of the element oxygen join to form a molecule of oxygen. In the same way, two atoms of the element hydrogen join to form a molecule of hydrogen. Look at the drawing above. It shows a molecule of oxygen. You can see that two oxygen atoms have joined to form this molecule. The oxygen and hydrogen molecules are not compounds. Compounds are formed only when atoms of different elements join." },
      ],
      [
        { type: 'activity', text: "Can you form a compound? Materials 2 test tubes / steel wool pad / magnet water / 2 test-tube clamps / ring stand / 600-ml beaker / wax pencil / hand lens Procedure A. Test a steel wool pad with a magnet. 1. Is the steel wool attracted to the magnet? B. Wet the steel wool pad with water. Fill the lower 2 cm of a test tube with a piece of the steel wool pad as shown. Use a pencil to push the pad into the tube. Use a wax pencil to make a mark 2 cm from the open end of each test tube. C. Half fill a beaker with water. Set up the two test tubes with the beaker and a ring stand. One test tube will be empty. Make sure the wax pencil mark is even with the surface of the water. 2. Predict what will happen in each test tube. D. Observe the test tubes for 5 days. Note any changes that occur inside the test tubes each day. 3. How has the steel wool pad changed? 4. How has the water level changed? E. After 5 days remove the steel wool pad and look at it with a hand lens. Test it with a magnet. ’ 5. Describe how the steel wool pad looks. 6. Is the steel wool attracted to the magnet? Conclusion A new compound has been formed. It is called iron oxide. Iron oxide is made from iron and oxygen. The oxygen came from the air. 1. Where did the iron come from? 2. Why do you think the water level changed? Using science ideas There are many things around you that are made of iron. Name some ways that you can prevent Iron objects from changing to iron oxide." },
      ],
      [
        { type: 'p', text: "You have learned that the atoms in a compound are from different elements. Table salt, for example, is made of the elements sodium and chlo- rine. Sugar is another compound. It is made of atoms of the elements carbon, hydrogen, and oxygen. A compound may be very different from the atoms it is made of. Sugar is a white crystal that tastes sweet. It is formed of the elements carbon, hydrogen, and oxygen. Are these three elements very different from sugar?" },
        { type: 'p', text: "Look at the table of the compounds on page 125. The table lists four common compounds. It shows the elements they are made of and describes these elements. Find the description of the elements that make up sugar. You will find that the elements making up sugar are different from the compound sugar." },
      ],
      [
        { type: 'p', text: "Find the elements that make up table salt. Do the elements sodium and chlorine look like table salt? No. Sodium is a silvery metal. Chlorine is a greenish-yellow poisonous gas. Table salt is a white crystal us£d to season food. Notice that the compound salt is different from the elements that make it up." },
        { type: 'p', text: "Elements In compound; symbol for elements Description of elements Enlarged salt crystals Water droplets Enlarged su ar crystals Ammonia In water Here is another example. Water is a compound formed from elements that are different from wa- ter. On the earth water can be found as a liquid, as a solid, and as a gas. We drink it and we bathe in it. It makes up about two thirds of our body." },
      ],
      [
        { type: 'p', text: "Water is made up of the elements hydrogen and oxygen. Hydrogen is a gas that has no color, taste, or odor. Oxygen is also a gas. It, too, has no color, taste, or odor. It makes up about one fifth of the air. The elements that make up water are very different from the compound water." },
        { type: 'p', text: "Remember that scientists use symbols for the names of elements. It is easier to write the symbol for an element than to spell out its name. Scientists also use these symbols to write the names of compounds. Water is written H2O. H2O stands for one molecule#of water. The symbol for hydrogen (H) is joined with the symbol for oxygen (0)." },
      ],
      [
        { type: 'sidebar', text: "The small number 2 after the H means there are two atoms of hydrogen in a molecule of water. Notice that there is no number*after the O. This means there is only one atom of oxygen in a molecule of water. Do you know? The chemical symbols used by scientists today were not always used. Over the centuries the symbols for the elements have changed. In the sixteenth century the symbol for gold was a picture of the sun. The symbol for mercury was a staff carried by the god Mercury. Lead was represented by a farm tool carried by the god Saturn. In 1814 all this changed. A chemist in Sweden decided to use letter symbols for the elements. These symbols were based on the ancient names of the elements. Au. used for gold, stands for aurum (or'em). Hg. used for mercury, stands for hydrargyrum (hi drdr'jer am). Pb. used for lead, stands for plumbum. These same letter symbols are still used today by chemists all over the world. gold Q @ mercury *i © lead K T? © Pb" },
      ],
      [
        { type: 'p', text: "H2O is the formula (for'mye le) for water. A formula is a group of symbols and numbers that stands for a compound. The symbols in a formula show the kinds of atoms in a compound. The numbers in a formula show the number of atoms in the smallest particle of a compound." },
        { type: 'p', text: "Every compound can be written with a formula. The formula for one type of sugar is C12H22O n . What does this formula show you? It shows you" },
      ],
    ]
  },
  "Ch.06 · Physical Changes in Matter": {
    title: "Physical Changes in Matter",
    pages: [
      [
        { type: 'p', text: "The children in the picture are playing a game. The girl is blindfolded and then asked to smell two different kinds of food. She must identify which is a piece of onion and which is a piece of orange. The girl is using odor as a way of identifying matter." },
        { type: 'p', text: "These pictures show two elements-gold and carbon. How can you tell the piece of gold from the piece of carbon? One way to tell is by observing how each one looks. The color of gold is different from the color of carbon. Based on color, which piece is gold and which is carbon?" },
        { type: 'p', text: "Odor and color are physical properties of matter. A physical pfoperty is one that can be used to identify matter. Two other physical properties are shape and hardness." },
      ],
      [
        { type: 'p', text: "Density is also a physical property of matter. It is the mass in a certain volume of matter. For example, the piece of wood Ijas a certain volume. Its mass is 8 g. The piece of iron has the same volume as the wood. The mass of the iron is 136 g. So the density of the iron is greater than the density of the wood. How many times greater?" },
        { type: 'p', text: "You can use the property of density to help you identify matter. In the pictures below, the glasses labeled >1 and B each contain a colorless liquid. One' liquid is water and the other is alcohol. Water has a greater density than alcohol. Look at the picture on the right. An ice cube has been put into each liquid. The ice floats in the denser liquid and sinks in the less dense liquid. Which glass contains alcohol, A or B? How do you know?" },
      ],
      [
        { type: 'p', text: "------ PHYSICAL CHANGES --------- What kinds of physical changes can occur in Matter can change in different ways. The pictures show a glass cup before and after it was dropped. Breaking the glass cup changes its size and shape. This kind of change is a physical change. A physical change is a change in the size, shape, or state of matter. New materials are not formed when there is a physical change. The same kind of matter is present both before and af- ter a physical change. The pieces of the cup are no longer in the shape of a cup. But you can see that the pieces are still glass." },
      ],
      [
        { type: 'p', text: "Changes in size and shape are common physical changes. When you write with chalk, tiny bits of chalk are rubbed from the stick of chalk onto the chalkboard. However, the bits of chalk are still chalk. The atoms and molecules in the chalk are not changed. They simply have been spread out across the chalkboard." },
        { type: 'p', text: "In each case, a physical change has taken place. The size and shape of matter have been changed. But the atoms and molecules in the mat- ter have not been changed. The same kind of matter is present before and after each change." },
        { type: 'p', text: "Matter can exist in three forms, or states. The three states of matter are solid, liquid, and gas. Many kinds of matter can change from one state to another. A change in state is another kind of physical change." },
      ],
      [
        { type: 'p', text: "Water is one of the few kinds of matter that commonly exists in all three states. Rain is liquid water. Ice cubes and icebergs are solid water. Water as a gas is invisible. It is called water vapor. Although you cannot see it, there is always water vapor in the air. How many states of water can you see in the picture? How many do you think there are?" },
        { type: 'p', text: "How do the three states of matter differ? Remember that all matter is made of tiny particles. Different states of matter differ in how far apart these particles are. There is an attraction between the particles in matter. The strength of this attraction varies with the amount of space between particles. Also, the way in which particles in each state of matter move is different. The drawing shows how particles in a solid, a liq- uid, and a gas might look." },
      ],
      [
        { type: 'p', text: "Particles in solid matter are packed very close together. This causes the attraction between these particles to be strong. The particles move back and forth in a very small space. Because the particles have a strong attraction for each other, they do not move around very much. For this reason, solids have a definite shape. It is also why solids have a definite volume. A cube of sugar and a brick are solids. What are some other solids?" },
        { type: 'p', text: "Particles in liquid matter are not as close together as those in a solid. So the attraction between particles in a liquid is weaker than in a solid. The weaker attraction allows particles in a liquid to slip and slide over and around one another. Because of the way the particles move, liquids have no definite shape. Liquids take the shape of the container they are in. As the par- ticles in liquids move, the spaces between them do not change. So liquids have a definite volume." },
      ],
      [
        { type: 'p', text: "The picture shows containers of different sizes and shapes. The same volume of water is in each one. What property of liquids does this show?" },
        { type: 'p', text: "Particles in gases are spread farther apart than the particles in liquids. So the attraction between them is very weak. This very weak attraction allows particles in a gas to move freely. Because the attraction is so weak and the spaces so great, gases have no definite shape or volume. Suppose a gas is put in a closed box or jar. The particles of the gas will spread out until they fill the box or jar." },
        { type: 'p', text: "Changes in state are common physical changes. Energy is involved when matter changes from one state to another. Energy must be added to change a solid to a liquid. Energy must also be added to change a liquid to a gas. The energy that is added is usually in the form of heat. Heat energy causes the particles in solids and liquids to move faster. This increases the spaces between the particles and weakens the attraction. So a solid changes to a liquid and a liquid to a gas." },
      ],
      [
        { type: 'p', text: "A glass of ice cubes left out on a hot summer day will melt. Melting is the change of state from a solid to a liquid. When heat is added to a solid, what happens to the particles in the solid? How does this explain why the solid melts? The temperature at which a solid changes to a liquid is called the melting point." },
        { type: 'p', text: "Cooking food often involves boiling liquids. When something boils, it changes from a liquid to a gas. As heat energy is added, some particles in the liquid have enough energy to escape from the liquid. The escaped particles are now particles in a gas. The temperature at which a liquid changes to a gas is called the boiling point." },
      ],
      [
        { type: 'p', text: "How fast and how far can particles In a gas move? Get a bottle of perfume and some absorbent cotton. Have a partner stand about 5 m away. Have your partner open the bottle of perfume and pour a small amount of it onto the cotton, Note the time. When you can smell the perfume, note the time again. How long did it take for you to smell the perfume?" },
        { type: 'p', text: "How far did the perfume particles travel to reach you? What conditions in the room might have affected how quickly the perfume particles reached you? * Most substances have a definite melting point and boiling point. Melting point and boiling point are physical properties <of matter. The melting point of water is 0°C. Its boiling point is 100°C." },
      ],
      [
        { type: 'p', text: "Some changes of state involve taking energy away. To change a gas to a liquid or a liquid to a solid, energy must be removed. The energy that is removed is usually heat energy. When heat energy is removed, the particles in matter move more slowly. So the spaces between the particles become smaller. What happens to the attraction between particles? How does this cause a liquid to change to a solid? How is the liquid orange juice changed to a solid?" },
        { type: 'p', text: "Melting, boiling, and other changes in state may not seem like physical changes, but they are. Molecules in liquid water are not changed when th<? water changes to a gas or a solid. Liquid iron is made up of the same kinds of atoms that make up solid iron. Physical changes do not change the particles that make up matter." },
      ],
      [
        { type: 'p', text: "Solid Iron ... 141 liquid iron The children in the picture below are making a salad. They are mixing some lettuce, carrots, green peppers, and other vegetables. A salad is a mixture (miks'cher) of different vegetables. A mixture is a material formed by the physical combining of two or more different materials. Mixed nuts are another example of a mixture." },
        { type: 'p', text: "The materials in a mixture are not combined as they are in a compound. In a compound, substances have combined to form a new substance. But the materials that are in a mixture do not change to something else. Lettuce remains let- tuce when it is mixed with carrots. The materials in a mixture can be physically separated. How could you separate the pieces of vegetable in the salad mixture? A mixture ot nuts" },
      ],
      [
        { type: 'activity', text: "How can substances in a mixture be separated? Materials spoon / table salt / sand / dark-colored paper / hand lens / 2 jars / filter paper / funnel / paper towel / glass or plastic dish Procedure A. Put a spoonful of table salt and a spoonful of sand on a sheet of dark paper. Use a hand lens to look at the sand and the salt. Draw some particles of each, 1. How are the particles different? B. Mix the sand and the salt together. Put water into a jar so the jar is half full. Add the salt-sand mixture to the water in the jar. Stir the mixture with the spoon. 2. What happens? C. Fold a piece of filter paper as shown. Put the filter paper into a clean funnel. Put the funnel in another jar so it rests on the mouth of the jar. D. Slowly pour all the salt-sand-water mixture into the funnel. Now take the filter paper out, open it, and place it on a paper towel. Allow the material on the filter paper to dry. E. Pour a small amount of the liquid from the Jar into a dish. Allow the liquid in the dish to evaporate. 3. What material do you think will be left in the F. Use a hand lens to look at the dried materials on the filter paper and In the dish. 4. What material is left on the filter paper? 5. What material is left in the dish? Conclusion 1. When you made the salt-sand-water mixture, what kind of change in matter occurred? 2. Describe how the materials in the mixture were separated." },
      ],
      [
        { type: 'p', text: "The pieces or particles in a mixture can be of different sizes. The pieces of vegetable in the salad are large. Suppose you mix sand and salt together. The particles are small, but they can be seen. They can also be separated from each other by physical means." },
        { type: 'p', text: "Mixtures are found everywhere. Almost all foods are mixtures. Nearly all the water on the earth is a mixture. If you have ever tasted ocean water, you know it is salty. Ocean water is a mixture of water and different kinds of salts. What mixtures are shown at the left?" },
        { type: 'p', text: "One special type of mixture is called an alloy (al'oi), Most alloys are mixtures of two or more metals. Most alloys are harder and stronger than each of the metals they are made from. For example, when iron Is mixed with carbon and certain other elements, steel is formed. Steel is stronger and better able to resist rust than iron alone." },
      ],
      [
        { type: 'p', text: "Some scientists think that alloys can be made cheaper and better in space. They are testing this idea by making certain alloys during missions of the Space Shuttle. Some day most of the alloys we use on the earth may be made in factories in space." },
        { type: 'heading', text: "TWO KINDS OF MIXTURES" },
        { type: 'p', text: "How are a solution and a suspension different?" },
        { type: 'p', text: "You have learned that the particles in some mixtures are large enough to be seen. You can see the grains that make up a mixture of sand and salt. In other mixtures the particles that are mixed together are individual molecules. You cannot see the particles in a mixture of sugar and water. The particles of sugar and water are individual molecules." },
      ],
      [
        { type: 'p', text: "A mixture of sugar and water is a special kind of mixture. It is called a solution (se lu'shen). A solution is a mixture that forms when one substance dissolves in another. In a solution the par- ticles of the substances are evenly mixed. Most solutions are a solid dissolved in a liquid. These solutions are clear, even if they are colored." },
        { type: 'p', text: "What happens when sugar mixes with water? The sugar particles seem to disappear in the water. Of course the sugar has not disappeared. It has dissolved in the water. This means that the water molecule sugar molecule gloss beaker A solution of sugar and water 145 sugar molecules are evenly mixed with the water molecules. You cannot see the tiny sugar molecules. But if the water evaporates, the sugar molecules form solid sugar again." },
      ],
      [
        { type: 'p', text: "A solution has two parts. The solute (sol'yut) is the substance in a solution that dissolves. In a sugar-and-water solution, sugar is the solute. Wa- ter is the solvent. The solvent (sol'vent) is the substance in a solution that does the dissolving." },
        { type: 'p', text: "Several things affect how fast a solute dissolves in a solvent. Stirring makes a solute dissolve faster. Temperature also affects how fast a solute dissolves. Most solutes dissolve faster in a warm solvent than in a cold one. The picture shows powdered tea in hot water and in cold water. The same amount of tea was put into each glass at the same time. Why is there a difference in the amount of tea dissolved in each glass?" },
      ],
      [
        { type: 'p', text: "The size of the solute particles also affects how fast the solute dissolves. Small solute particles dissolve faster than large solute particles. For example, small grains of sugar will dissolve faster than a whole sugar cube." },
        { type: 'activity', text: "How does the size of solute particles affect how fast a solute dissolves? Materials 2 jars / 2 sugar cubes / paper / plastic bag Procedure A. Half fill two jars with warm water. B. Wrap a sugar cube in a piece of paper. Put the wrapped cube into a plastic bag. Crush the sugar cube into a powder by stepping on the bag. C. Pour all of the crushed sugar into one of lhe jars of water. Quickly drop a whole sugar cube into the other jar of water. 1. Which do you think will dissolve first, the sugar cube or the crushed sugar? D. Watch each jar and note in which one the sugar dissolves first. 2. Which dissolves first, the sugar cube or the crushed sugar? 3. How is the size of the solute particles different in each jar? Conclusion How does the size of the solute particles affect how fast a solute dissolves? Using science ideas Repeat steps A through D, but put hot water in one jar and cold in the other. Put the whole sugar cube in the hot water and the crushed sugar cube In the cold water. Does this affect whether the cube or crushed sugar dissolves first? Explain the results." },
      ],
      [
        { type: 'p', text: "The picture on the left shows what happens when crushed chalk is mixed with water. You can see that the water becomes very cloudy. But the chalk and water do not form a solution. The par- ticles of chalk do not dissolve in the water. The chalk particles float in the water. The mixture of chalk and water is called a suspension (saspen'shen). A suspension is a mixture in which particles of a substance do not dissolve in another substance. Suspensions are cloudy mixtures." },
        { type: 'p', text: "In the chalk -and-water mixture, the chalk particles are suspended in the water. If they are not disturbed, the particles that are in a suspension will separate from the liquid. They will settle to the bottom. The picture on the right shows the chalk-and-water mixture after 2 days. The chalk particles have settled to the bottom." },
      ],
      [
        { type: 'p', text: "You may have seen bottles labeled Shake well before using. Many such bottles contain some kind of suspension. A vinegar-and-oil salad dressing is a suspension. Orange juice and some liquid medicines are also suspensions." },
        { type: 'heading', text: "ANOTHER KIND OF CHANGE" },
        { type: 'p', text: "You have learned about many different physical changes in matter. But matter can change in another way. When a piece of wood burns, it changes into new substances. Burning wood is an example of a chemical change. A chemical change is a change in matter in which one or more different kinds of matter form." },
        { type: 'p', text: "The physical properties of matter change when there is a chemical change. You can see that iron is a dark-gray metal. Iron is attracted by a magnet. Sulfur is a yellow powder that is not attracted by a magnet. When iron and sulfur are mixed together, they can easily be separated. Neither substance has changed. But when iron and sulfur are heated together, a chemical change takes place. A new substance is formed. This substance is iron sulfide. It is brown-black in color. And it is not attracted to a magnet." },
      ],
      [
        { type: 'p', text: "Some chemical changes take place slowly. The* rust on the body of this car formed from a slow chemical change. Oxygen from the air joined with iron to form the compound iron oxide. Iron oxide is commonly called rust. How does paint help stop rust from forming?" },
        { type: 'p', text: "Rusllng—a slow chemical change Other chemical changes take place more quickly. When vinegar is poured on baking soda, a rapid chemical change takes place. There are new substances formed. One new substance is carbon dioxide gas." },
      ],
    ]
  },
  "Ch.07 · Understanding Electricity": {
    title: "Understanding Electricity",
    pages: [
      [
        { type: 'p', text: "You depend a great deal on electricity. But what is electricity? You cannot see it. You can only see what it does. For a long time scientists have been interested in what electricity is and does." },
        { type: 'p', text: "What is known about electricity? Scientists know that everything is either matter or energy. Matter has mass and takes up space. Since electricity does not have mass or take up space, it must be energy." },
        { type: 'p', text: "Train running on electricity You know that elec tricity can do work. What kind of work is being done in the picture?" },
        { type: 'p', text: "Lot of-wa ancec has ft will ht rectioi side w smallei move t< To understand electrical energy, you must understand matter. Remember that all matter is made of atoms. Knowing the structure of the atom will help solve the mystery of electricity." },
      ],
      [
        { type: 'p', text: "You have learned that the atom has a central part called a nucleus. There are particles in the nucleus. Some of these particles have a positive 156 o charge. They are called protons. Moving around the nucleus are other particles, called electrons. The electrons in an atom ha e a negative charge. If the number of protons and the number of electrons in an atom are the same, their charges balance one another. When this happens, the atom has no charge. An atom with no charge is neutral (nu'trel). Under normal conditions the atoms in most matter are neutral. As the drawing shows, the number of electrons and protons is balanced. O electron Look at the drawing of the children playing tugof-war. You can see that the teams are not balanced. One team has six children and the other has four. To balance the teams, some children will have to move. They can move in only one direction. Some children will have to move from the side with the larger number to the side with the smaller number. How many children will have to move to balance the teams?" },
      ],
      [
        { type: 'p', text: "In some ways electricity is like this game of tugof-war. Suppose the number of protons and the number of electrons in an atom are not the same. This happens when an atom gains or loses electrons. If an atom has more electrons than protons, the atom has a negative charge. An atom with more protons than electrons has a positive charge." },
        { type: 'p', text: "Look at the drawings of the atoms. As you can see, atoms can gain or lose electrons. Atom A is losing an electron. Atom B is gaining an electron. This movement of electrons produces electricity. Which atom has a positive charge? Which atom has a negative charge?" },
        { type: 'p', text: "Does clear tape have an electric charge? You will need a roll of clear tape. Remove two strips of tape from the roll. Each strip should be about 8 cm long. Make sure that you touch only one end of the tape. Slowly move the two sticky sides of the tape toward each other. Then slowly move the two smooth sides teward each other. Watch what happens. Do the pieces of tape have an electric charge? How can you tell?" },
      ],
      [
        { type: 'p', text: "It is a cold, dry day in winter. You walk across a wool carpet and reach out to turn a doorknob. You feel a shock. What happened? When you moved across the carpet, you gained electrons. Your shoes rubbed electrons off the carpet. The electrons built up on your body and stayed there. This buildup of electrons gave your body an electric charge. An electric charge that does not move is called static (stat'ik) electricity." },
        { type: 'heading', text: "ELECTRIC DISCHARGE" },
        { type: 'p', text: "When you touched the doorknob, electrons moved from you to the doorknob. Why did this happen? Electrons move from a place where there are many electrons to a place where there are fewer electrons. Your body had more elec- trons than the doorknob. When you touched the doorknob, the extra electrons moved from your body to the doorknob. This movement of the ex- ( tra electrons is called an electric discharge (dis'- chdrj). After the electric discharge, you became Lightning is another example of a discharge of static electricity. Lightning is often caused by a buildup of electrons on a cloud. The cloud has more electrons than the ground. When the difference between the charge on the cloud and the charge on the ground is great enough, an electric discharge occurs. You can see this discharge as lightning." },
      ],
      [
        { type: 'heading', text: "WHY LIGHTNING STRIKES" },
        { type: 'p', text: "Electrons move when they jump from a finger to a doorknob. They also move when lightning strikes the earth. This movement of electrons is called current electricity. Current electricity is more useful than static electricity. What are some ways that current electricity is used?" },
        { type: 'p', text: "The electricity that jumped to the doorknob had to move through some form of matter. It moved through air. Electricity can move through The first person to prove that lightning is a form of electricity was Benjamin Franklin. He aid this by flying a silk kite during a thunderstorm. He attached a metal wire to the kite string near the top of the kite. He then tied a metal key to the lower end of the string. Electrons from the clouds collected on the wire. They then flowed down the string to the key. When Franklin touched the key, he felt a small shock. The electrons had Jumped onto his fingers. Franklin concluded that the electricity he felt came from the clouds. If lightning had struck the kite, he would have died from a powerful shock." },
      ],
      [
        { type: 'p', text: "other forms of matter, such as metal. Matter through which an electric current moves easily is called a conductor (ken duk'ter). Most metals are good conductors. Some metals are better conductors than others. Gold, silver, and copper are all good conductors. Copper is low-priced and easy to obtain. So it is often used as a conductor." },
        { type: 'p', text: "Not all kinds of matter are good conductors. Current cannot move easily through wood, rubber, glass, or plastic. Matter that is not a good conductor is called an insulator (in'sa la ter). Rub- ber is often used as an insulator around copper wire. The rubber helps to keep electricity in the wire. An insulator helps to prevent electric shock." },
      ],
      [
        { type: 'activity', text: "Materials 6-volt battery / light bulb and socket / 3 test leads / copper penny / cardboard strip / toothpick /aluminum toll / paper clip / rubber band Procedure A. You are going to test different materials to see If they are conductors or Insulators. Make a chart like the one shown below. Material tested Conductor Insulator copper penny toothpick cardboard strip aluminum foil paper clip rubber band B. Connect the battery, test leads, and light bulb as shown. C. Remove one of the test leads from the bulb. Clip it to a copper penny. Use another test lead to clip the penny to the bulb as shown. 1. What happens to the bulb? 2. Is the penny a conductor or an insulator? D. Repeat step C for each of the other materials. Fill in your chart. Conclusion 1. Which materials are conductors of electricity? 2. How are all the conductors alike? 3. Which materials are insulators? How do you know? Using science ideas Look around your home for tools that are used to repair electric devices. The handles of some of the tools will be covered with rubber. Explain why." },
      ],
      [
        { type: 'p', text: "Electricity must flow through a path to be useful. The path through which an electric current flows is a circuit (ser'kit). A circuit lets electrons flow from a place where there are many electrons to a place where there are few. The flow of electrons in a circuit is similar to the flow of water in a pipe. Like water, electrons need a path to follow. The pipe gives water a path to follow. The circuit gives electrons a path to follow. The drawing shows a light bulb in an electric circuit. Electricity flowing through the wire lights the bulb." },
        { type: 'p', text: "An electric circuit must be complete for electricity to flow through it. A circuit that is complete is called a closed circuit. If there is a break in the circuit, electricity will not flow through it. A circuit that is broken, or incomplete, is called an open circuit. The opening and closing of a circuit is controlled by a device called a switch." },
      ],
      [
        { type: 'heading', text: "OPEN CIRCUIT CLOSED CIRCUIT" },
        { type: 'p', text: "There are two kinds of electric circuits. One kind is a series (sir'ez) circuit. A series circuit is one in which current can follow only one path. An open switch or a broken wire stops the flow of current in a series circuit. The drawing shows a simple series circuit. It has an energy source, a copper wire, a switch, and two light bulbs. What happens to the flow of current when the switch is open? What happens when the switch is closed? Suppose one more light bulb is added to the circuit. The current must flow through it also. If one of the bulbs burns out, the path is broken. The current no longer has a path to move through." },
      ],
      [
        { type: 'p', text: "The other kind, of electric circuit is a parallel (par's lei) circuit. A parallel circuit is one in which current can follow more than one path. Look at the parallel circuit with two bulbs shown in the drawing. The current does not have to flow through the green bulb to reach the red bulb. Compare it with the drawing of the series circuit. How many paths can you trace in the parallel circuit?" },
        { type: 'p', text: "Most circuits used in homes are parallel circuits. If you turn off one light in your home, the other lights will stay on. The parallel circuit provides another path for the current to follow. It is like taking a detour on a road. Traffic can flow from one point to another, but it goes along a dif- your home were not wired in a parallel circuit?" },
      ],
      [
        { type: 'heading', text: "PARALLEL CIRCUIT" },
        { type: 'activity', text: "circuit? Materials 6-volt battery ' 2 light bulbs and sockets / 5 test leads / Insulated copper wire Procedure A. Connect one light bulb in a circuit, as shown in . the top picture. 1. Observe the brightness of the bulb. 2. What would happen if you added one more B. Add one more bulb to the circuit, as shown in the middle picture. You have connected the bulbs in a series circuit. Observe the brightness of the two bulbs. 3. Are the two bulbs brighter than the one bulb? 4. Why is there a difference? C. Connect two bulbs in the circuit, as shown in the bottom picture. This is a parallel circuit. Observe the brightness of the bulbs. 5. Are the bulbs as bright as the bulbs in step B? 6. Are the bulbs as bright as the bulb in step A? Conclusion 1. Which circuit has the brighter bulbs? 2. Explain in your own words the difference between a series circuit and a parallel circuit. Using science ideas 1. Draw a series circuit that has five bulbs. Suppose one bulb burned out. What would happen to the other bulbs? 2. Draw a parallel circuit that has five bulbs. Suppose one bulb burned out. What would happen to the other bulbs?" },
      ],
      [
        { type: 'p', text: "Have you ever used a magnet to pick up pins or paper clips? Did you know that a magnet can also be used to produce electricity? This property of magnets was known in 1831. A scientist named Michael Faraday found that a magnet can be used to produce electricity." },
        { type: 'p', text: "The drawing shows, in a simple way, what Faraday did. He moved a strong magnet back and forth through a coil of wire. Electrons moved along the wire! How did this happen? Electrons were not moving along the wire before the magnet was passed through it." },
        { type: 'p', text: "You may know that a magnet has lines of force around it. These lines of force cause some metal objects to move toward the magnet. They can also make electrons move inside a wire. Moving electrons produce an electric current." },
      ],
      [
        { type: 'p', text: "Faraday’s discovery was used to make a machine that is still in use today. This machine is a generator (jen'a rfl tar). A generator changes energy of motion into electrical energy. When coils of wire cut through a strong magnetic field, electrons move through the wire. To keep the electrons moving, either the wire or the magnet must be kept moving." },
        { type: 'p', text: "To produce electricity, a generator needs energy from an outside source. Most of this energy comes from the burning of fuels, such as coal, oil, and gas." },
        { type: 'p', text: "The drawing shows how electrical energy is produced by a generator. Look at the drawing as you read each step." },
        { type: 'p', text: "1. Gas is burned to heat water to produce steam. 2. The. steam /urns the blades of a turbine (ter'bin). A turbine is a device that is made up of a wheel and blades." },
      ],
      [
        { type: 'p', text: "3. The turbine is attached to a generator, which is shown as a macfhet inside a coil of wire. As the turbine moves, it turns the magnet. This produces an electric current inside the coil of wire. 4. The current produced in the coil of wire" },
        { type: 'heading', text: "HOW A GENERATOR PRODUCES ELECTRICITY" },
        { type: 'p', text: "Generators are not the only way we can produce electricity. You may own flashlights, small radios, and toys that need a supply of energy. They do not have generators. Instead they use a device commonly called a battery. A battery is really two or more electric cells joined together. An electric cell is a device that changes chemical energy to electrical energy." },
      ],
      [
        { type: 'p', text: "positive negative (+)pole (-)pole One type of electric cell is called a dry cell. dry cell uses a chemical paste, carbon rod, and zinc case to produce a flow of electrons. Chemical reactions occur inside the dry cell. One reaction causes the walls of the zinc case to become negatively charged. Another reaction causes the carbon rod to become positively charged. The zinc case is called the negative pole. The carbon rod is called the positive pole. If the dry cell is connected to a circuit, electrons flow from the negative pole to the positive. This movement of electrons forms an electric current." },
        { type: 'p', text: "A true battery is made of two or more cells. Most car batteries are made of six cells. A car battery does not use a chemical paste to make electricity. Instead it uses acid and water, which react with metal plates. The chemical reaction of the metal and acid produces a flow of electrons. Such a battery is called a wet cell battery. The car battery, below, is a wet cell battery." },
      ],
      [
        { type: 'heading', text: "CAR BATTERY" },
        { type: 'p', text: "Every day you use electricity in many ways. You may wake up to the sound of an electric alarm clock. You may eat breakfast cooked on an electric stove. You use electricity at home and in school. It is also used in stores and factories. Look at the drawing of the house. How many uses of electricity can you find?" },
        { type: 'p', text: "To be useful, electricity must be changed to other kinds of energy. Think back to what you know about magnets. The electromagnet is a magnet that forms when a current passes through a wire coiled around a metal core. A giant electromagnet can be used to lift heavy metal objects in a.scrapyard. This is an example of how electricity can be changed to another kind of energy." },
      ],
      [
        { type: 'p', text: "Electrical energy can also be changed to md* chanical (ma kan'a kal) energy. Mechanical energy is energy of moving machine parts. You can see this change in an electric motor. An electric motor is a machine that changes electrical energy to mechanical energy. When you plug a motor into a wall outlet, the electricity turns the motor. Mixers, fans, and power tools all have motors. Look again at the drawing of the house on page 171 . Where are motors used?" },
        { type: 'p', text: "Electricity is also an important source of light and heat. For example, in a light bulb or a toaster, electricity is changed to light or heat energy." },
        { type: 'p', text: "Let's see how a light bulb produces light. The light bulb has a glass cover, a base, and a filament. The filament (fil'e ment) is a thin coil of wire. When a current moves through the filament it becomes hot. The hot filament glows and gives off light. The glass cover prevents air from reaching the filamdht. What would happen if air reached the glowing filament?" },
      ],
      [
        { type: 'p', text: "Each day great amounts of electrical energy are used in homes, schools, and offices. How is electricity used in the picture of the office building? You use a certain amount of electricity when you watch television for an hour. You use a different amount when you read for 2 hours by the light of a lamp. Have you ever had someone tell you to turn off a light? Energy use costs money. Someone must pay for all the energy you use. But before you can pay for it, it has to be measured. The person in the picture is reading a meter that measures the amount of electricity used." },
        { type: 'p', text: "Reading an electric meter Electricity is used to do work. The more work a device does, the more electricity it uses. Also, the faster a device works, the more electricity it uses. The amount of work that is done in a certain period of time is called power. Small amounts of electric power are measured in units called watts (wots). Large amounts of power are measured in kilowatts. A kilowatt (kil'e wot) is 1,000 watts." },
      ],
      [
        { type: 'sidebar', text: "Most electric devices have the number of watts they use printed on them. One motor may have 50 watts printed on it. Another motor may have 100 watts printed on it. The 100-watt motor uses twice as much energy as the 50-watt motor in the same amount of time. Look at the light bulbs in the picture. How many watts does each bulb use? Which one uses the most power? Electric companies measure how much electricity a customer uses in kilowatt-hours. A kilowatt-hour is equal to 1,000 watts of electricity used for 1 hour. A 100-watt motor can run for 10 hours before it uses a kilowatt-hour of electricity. How long can a 50-watt light bulb burn before it uses a kilowatt-hour of electricity? Meters measure the amount of electricity used in a building. Do you know where the meter is at your house? The meter shows how many kilowatt-hours of electricity were used in your home. Each kilowatt-hour costs a certain amount of money. Look at the picture of an electric bill. How many kilowatt-hours of electricity were used during the month? How much did the electricity cost? Electric bill" },
      ],
      [
        { type: 'heading', text: "USING ELECTRICITY SAFELY" },
        { type: 'p', text: "How can a building be made electrically safe?" },
        { type: 'p', text: "Every building has safety devices to help keep electricity safe. Fuses (fytiz'ez) and circuit breakers protect buildings against fire. How do they do this? Each circuit is made to handle a certain amount of electric current. If too many appliances are plugged into a circuit, the wires may become too hot. When this happens, fuses and circuit breakers help to keep fires from starting." },
        { type: 'p', text: "Good fuse and blown fuse , These two safety devices are made to break the circuit if the wires become too hot. A metal strip inside a fuse melts and the fuse blows. This breaks the circuit. A special switch in a circuit breaker turns off to break the circuit." },
      ],
      [
        { type: 'p', text: "Electricity should not be allowed to flow again until the cause of the problem is found. The number of appliances on the circuit should be checked. There may be too many. There may also be something wrong with one of the appliances." },
        { type: 'p', text: "When the circuit has been checked, the current can be turned on again. The blown fuse can be replaced with a new fuse. The switch on the circuit breaker can be turned on again." },
        { type: 'p', text: "You too can help prevent electrical accidents. The following simple rules will help protect you from harm: DON'T put anything except an electrical plug into an electrical outlet. DON'T touch any electric appliance while you are wet. DON'T use an electric appliance that has a frayed cord. DON'T run an electrical cord under a carpet. DON’T plug too many electric devices into one outlet. DON-T touch a fallen power line. DON'T fly a kite near power lines. DON'T swim, play in an open field, or stand under a tree during a lightning storm." },
      ],
    ]
  },
  "Ch.08 · Sources of Energy": {
    title: "Sources of Energy",
    pages: [
      [
        { type: 'heading', text: "ENERGY FROM FOSSIL FUELS" },
        { type: 'p', text: "All machines need energy to do work. Some machines get their energy from muscle power. A bicycle is a machine that runs on muscle power. But most machines that are used today do not run on muscle power. They use another source of energy. This major energy source is fossil fuels. A fossil fuel is a fuel that forms from the remains of dead plants and animals. Coal, oil, and natural gas are fossil fuels." },
        { type: 'p', text: "Millions of years ago the earth was warm and wet. Much of the earth's surface was swampy. The drawing below shows what these swamps may have looked like. Many green plants grew and died in these swamps. Each plant had energy stored in it. Year after year, more plants died and piled up. The land sank beneath the weight of the plants. Seas began to form. Streams emptying into the seas carried sand and other material. The weight of all this matter pushed down hard on the dead plants. Over the years, heat and pressure caused the dead plants to change into coal." },
      ],
      [
        { type: 'p', text: "In other places, the earth of the past was covered with shallow seas. Tiny living things in these seas died and fell to the bottom. After many years, they became covered with sand, mud, and other material. Heat and pressure changed the re- mains of these living things to oil and natural gas." },
        { type: 'p', text: "Coal, oil, and gas are taken from the earth. Coal and gas do not have to be changed for use as fuels. Oil that is taken from the earth is called crude oil. Before crude oil can be used, it must be changed. Crude oil is changed to useful products in a refinery (ri fl'ner 6). These products include fuels such as gasoline, diesel (dS'zel) fuel, and home heating oil." },
      ],
      [
        { type: 'p', text: "Fossil fuels have many uses. The most important use is as a source of energy. But before thenenergy can be used, fossil fuels must be burned. This process is called combustion (kem bus'chan)." },
        { type: 'p', text: "In combustion, oxygen from the air combines with a fuel, producing heat and light." },
        { type: 'p', text: "Most of our electricity comes from the heat of burning fossil fuels. Look at the drawing. It shows coal being burned to heat water. When the water boils, it changes to steam. The steam is forced against a fan-shaped turbine. The force of the steam turns the blades of the turbine. The tur- bine is attached to a generator. The turbine turns the generator, which produces electricity. Power lines carry the electricity to other places." },
      ],
      [
        { type: 'p', text: "How coal Is used to produce electricity Fossil fuels are used in many other ways. Cars, trucks, planes, and trains all burn fossil fuels. The heat from burning fossil fuels is changed to the energy of motion by engines. Factories burn fossil fuels to make th jr products. The table on the next page lists main energy uses of fossil fuels." },
        { type: 'heading', text: "ENERGY USES OF FOSSIL FUELS" },
        { type: 'p', text: "Electricity production Manufacturing, such as making stoel Home heating Crude oil Gasoline for automobiles Diesel fuel for cars, trucks, and trains Jet fuel Kerosene for home heating Oil for home heating Bottled gas for campers and outdoor grills Supplies of fossil fuels are limited. Once they are used, they are gone forever. They cannot be replaced. The world will someday run out of this major energy source. So people must make wise use of fossil fuels." },
      ],
      [
        { type: 'p', text: "Are you wasting energy? You can locate heat energy leaks at home and at school. Get a pencil, a piece of plastic wrap, and some transparent tape. Tape the piece of plastic wrap along one side of the pencil. The plastic wrap should hang down about 15 cm from the pencil. You have made an energy-leak finder." },
        { type: 'p', text: "Test your classroom or a room at home for energy leaks. Hold the energy-leak finder in a place where you think air might be leaking to the outside. Check around windows and doors. If there Is a leak, the plastic wrap will move. Find out what could be done to prevent this waste of energy." },
      ],
      [
        { type: 'p', text: "The second major source of energy being used in the world is nuclear (ntl'kle er) energy. What is nuclear energy? You have learned that the atom is a small particle from which all matter is made. You have also learned that there is a nucleus in the- center of every atom. The energy stored in the nucleus of an atom is called nuclear energy. This energy has to be released before it can be There are two ways to release the energy that is stored in an atom. The most common process used is called fission (fish'en). In nuclear fission the nucleus of an atom is split, releasing energy. The atom that is most often used in fission is the uranium (yu ra'nfi am) atom." },
      ],
      [
        { type: 'p', text: "The other process used to release the energy that is stored in the atom is called fusion (fyu'zhen). Fusion is the opposite of fission. In nuclear fusion the nuclei (nii'kle I) of atoms are combined, releasing energy. (The word nuclei means \"more than one nucleus.\") In both fission and fusion large amounts of energy are released." },
        { type: 'p', text: "The most important use of nuclear energy today is to produce electricity. Fission is the process used to produce energy for electricity. Fission takes place in a special structure called a nuclear reactor. The large amounts of heat energy that result from fission are controlled in the reactor. In nuclear power plants the heat from fission is used to change water to steam. Look at the drawing below. Just as in coal-burning power plants, the steam is used to turn a turbine. The turbine is attached to a generator that produces electricity." },
      ],
      [
        { type: 'p', text: "hot water nuclear z ■ —- reactor f f generator turbine steam How nuclear energy Is used to produce electricity Fusion is not used today to produce useful energy. This is because scientists have not yet learned to control the great amount of energy released from fusion. Scientists are using the nuclear test reactor shown to help them learn to control fusion." },
        { type: 'p', text: "Although fusion cannot be controlled, almost all the energy on the earth comes from fusion. This is because the sun is the source of most of the earth's energy. And the sun produces energy from fusion." },
        { type: 'p', text: "Nuclear energy is one way to meet the world's energy needs. Some people think its benefits outwejgh its problems? People who favor using nuclear energy say it helps save fossil fuels. Electricity can be produced by using a lot less uranium than by using either coal or oil. In fact, jhst 1 gram of uranium produces as much energy as 3 metric tons of coal or 14 barrels of oil." },
      ],
      [
        { type: 'p', text: "Supporters of nuclear energy also say that it is clean energy. It does not release harmful smoke into the air, as happens when coal is burned. Why do nuclear power plants not give off smoke?" },
        { type: 'p', text: "But other people point to the problems in using nuclear energy. The fuel used inside these power plants gives off radiation (ra de a'shen). Radiation is the release of energy and particles from atoms." },
        { type: 'p', text: "It can harm living things. Some people fear that radiation inside power plants might leak to the outside." },
        { type: 'p', text: "Another problem is where to put the wastes from nuclear reactors. Some of these wastes give off harmful radiation for hundreds of years. So getting rid of them in a safe way is important. Scientists are looking for ways to do this." },
      ],
      [
        { type: 'heading', text: "ENERGY FROM THE SUN" },
        { type: 'p', text: "How is solar energy used, and what are some Almost all the energy on the earth comes from solar (sO'lar) energy. Solar energy is energy from the sun. Today solar energy is used mostly as a source of heat. Office buildings and houses are heated with solar energy." },
        { type: 'p', text: "One way to use solar energy is to \"trap\" it. Have you ever gotten into a closed car that had been parked in direct sunlight? If so, you know that a lot of heat was trapped in the car. The air in the car may have been much warmer than the air outside." },
        { type: 'p', text: "How does the air in the car become warmed? » Solar energy passes through the glass windows. When it strikes the material inside the car, the solar energy changes to heat. This warms the air inside the car. Because the car is sealed, very little heat escapes to the outside. So the air in the car becomes warmer and warmer. This buildup of -SA heat is called the greenhouse effect." },
      ],
      [
        { type: 'p', text: "Look at the picture of the greenhouse. Why are the walls and roof made of glass? The greenhouse effect is used to heat some houses and other buildings. This kind of heating is called passive solar heating." },
        { type: 'p', text: "There are other ways to use solar energy. One method makes use of large solar collectors. A so5 lar collector is a device that collects sunlight and changes it to heat energy. You can see solar collectors on the roof of this apartment building." },
        { type: 'p', text: "Inside the solar collectors there are rows of black tubes carrying water or air. Sunlight strikes the tubes and heats the water or air inside them. The tubes carry the heated water or air to pipes that run through the building. The heated water or air is pumped through the pipes. If the heat is not needed, the heated material goes to a storage area. On a cloudy day or at night, the stored heat can be used. Systems that have pumps or other moving parts use active solar heating." },
      ],
      [
        { type: 'p', text: "In addition to producing heat, solar energy can also be used to produce electricity. This can be done in two ways. One way is an indirect method. Solar energy is first used to produce heat. The heat changes liquid water to steam. The steam turns a turbine that is attached to a generator." },
        { type: 'p', text: "The type of solar collector shown below uses an indirect method to produce electricity. It has mirrors that gather sunlight. Another picture of this type of collector is on pages 180-181 of this chapter. The sunlight is reflected onto a small area on the tower. Inside the tower is a boiler that holds water. How can solar collectors such as this be used to produce electricity?" },
      ],
      [
        { type: 'p', text: "Another way to use solar energy to produce electricity is a direct method. A device called a solar cell changes solar energy into electrical energy. Solar cells are an energy source for many spacecraft and some buildings. There are solar cells covering the four arms of this spacecraft. Why would solar cells be useful in spacecraft? Solar cells on Viking spacecraft 192" },
        { type: 'sidebar', text: "Solar energy seems to be a perfect energy source. It is clean, plentiful, and free! But there are problems in using solar energy. One problem is that not all places receive enough sunlight to make solar energy useful. Also solar energy is not constant. If there are several cloudy days in a row, the stored heat or electrical energy may be used up. Do you know? The Solar Challengeris an airplane that is powered sol.ely by the sun's energy. There are a total of 16,128 solar cells covering the upper surface of this onepeyson plane. You can see these solar cells in the picture. They produce electricity that runs two small motors that turn the plane's propeller. The entire plane weighs less than 98 kg. On July 5. 1981. the Solar Challenger made a record-setting flight. It took off from France, flew across the English Channel, and landed more than 267 km away in England. During its Channel crossing, the craft reached an air speed of over 75 km/h, and the only fuel it used was energy from the sun! A drawing of the Solar Challenger appears on the back cover of this book." },
      ],
      [
        { type: 'activity', text: "Materials 2 cardboard shoe boxes with lids / scissors / clear plastic wrap / transparent tape / 2 thermometers / compass Procedure A. Use scissors to cut out a rectangular hole in one side of two shoe boxes. Cover the hole in each box with a piece of clear plastic wrap. Use transparent tape to attach the plastic wrap: B. Place a thermometer inside each box and put the lids on. Then make a chart like the one shown. C. Take the boxes outdoors on a sunny day. Use a compass to find north and south. Place one box so that its \"window\" faces south. Place the other box so that its \"window\" faces north. D. Open the boxes and check the temperature in each. Record this number as the starting temperature in your chart. Now close the boxes. 1. What is the temperature inside each box? 2. How do you think the temperature in the two boxes will change during the next 40 minutes? E. Every 10 minutes, for the next 40 minutes, record in your chart the temperature inside each box. 3. In which box was the final temperature greater? F. Make a graph showing how the temperature in each box changed. Conclusion 1. What was the difference between the starting and final temperature in each box? 2. Which lets in more solar energy, a north-facing wlndow.or a sowth-facing window? 3. In which direction should the windows face in a house that uses passive solar energy? Why?" },
      ],
      [
        { type: 'p', text: "-------- ENERGY FROM WATER -------- What are two ways that moving water is used for Moving water is an important source of energy used to produce electricity. In a hydroelectric (hidrfi i lek'trik) power plant the energy of moving water turns turbines attached to generators that produce electricity. Hydroelectric power plants, such as the one shown, are built as part of dams on rivers. Falling water flows through pipes inside the dam. The water flows over turbine blades at the bottom of the dam. The moving blades turn generators." },
        { type: 'p', text: "The number of places where hydroelectric power plants can be built are limited. Also when daps are built on rivers, large land areas may be flooded. This can destroy places where many plants and animals Eve." },
      ],
      [
        { type: 'p', text: "There is another way of using the energy of flowing water. Have you ever spent a day at an ocean beach? If so, you have probably seen that the water level along the shore rises and falls. In most areas the water level rises and falls twice a day. These daily movements of the water level along the shore are called tides." },
        { type: 'p', text: "Tidal (tr'del) energy is another energy source. Tidal energy is the energy of rising and falling tides. It can be used to produce electricity. To see how this is done, look at the drawing. A dam is built across a narrow opening to the ocean. During high and low tides, water moves in and out of the openings in the dam. As it moves through the openings, the water flows over turbine blades inside the dam. The turbines turn generators." },
      ],
      [
        { type: 'p', text: "Very few tidal power plants are in use today. The picture shows one that was built on a river in France. Tidal energy will probably never be a major energy source. For tidal energy to be used, there must be a large difference in the height of the water between low and high tides. But there are only a few pfaces in the world where tides are high and low enough to produce much energy. Tidal power plant 196 You have learned that almost all energy on the earth comes from solar energy. But there is also an energy source that is deep inside the earth. This kind of energy is called geothermal (j6 a- ther'mel) energy. It is energy from natural heat trapped beneath the earth's surface. This heat melts rock inside the earth. Melted rock inside the earth is called magma (mag'ma). In some places the magma comes close to the earth's surface. The magma collects in areas beneath the surface called hot spots. These hot spots are areas of geothermal energy." },
      ],
      [
        { type: 'p', text: "How can geothermal energy be used to produce electricity? When water in the ground comes in contact with hot spots, the water turns to steam. By drilling wells into the earth in hot spots, this How geothermal energy Is used to produce electricity steam can be released. The released steam can be used to turn turbines that run generators." },
        { type: 'p', text: "In some places steam and hot water come to the surface without drilling. There are deep cracks in rock inside the earth through which the steam and hot water can move. When they reach the surface, the steam and hot water may gush out of the ground. This is called a geysar (gT'zer). You can see one geyser. Old Faithful, in the picture on the left." },
      ],
      [
        { type: 'p', text: "The geothermal power plant in the picture is the largest in the world. This plant, called The Geysers, is located in California. It supplies enough electricity to run a large city. There are plans to expand The Geysers." },
        { type: 'p', text: "There are problems with geothermal energy. Many areas of geothermal energy are far from any large towns or cities. Electricity produced in these places would have to be carried great distances. This can be very costly." },
        { type: 'p', text: "The wind has been used as a source of energy for more than a thousand years. Wind energy is the energy of moving air. Long ago people used windmills to gryid. wheat into flour. Today windmills are being used to make electricity." },
      ],
      [
        { type: 'p', text: "Old windmill used (or grinding wheal Modern windmills look different from the windmills of long ago. However, they work in much the same way. The wind turns blades at the top of the windmill. The blades are connected to a generator that produces electricity. This device is often called a wind turbine." },
        { type: 'p', text: "The high cost of other sources of energy has made windmills popular in some places. But there are problems with wind energy. One problem is that there are not many places where the wind blows strong and steady. Another problem is the high cost of building and fixing windmills. So energy from the wind is not likely to do much to help the world's future energy needs." },
      ],
      [
        { type: 'activity', text: "Materials nylon thread, 20 cm long / Ping-Pong ball / transparent tape / colored marking pen / protractor / cardboard strip, 10 cm x 2 cm Procedure A. Tape one end of a piece of nylon thread to a Ping-Pong ball, Use a marking pen to color the thread so it will be easier to see. Tape the free end of the thread to the center of a protractor as shown, Then tape a cardboard strip to one side of the protractor. This will serve as a handle. You have now made a device to measure wind speed. B. Take your device outdoors. Hold the protractor so that the flat edge is level with the ground, as in the bottom picture. When the wind blows the ball, the thread will line up with marks on the protractor. Record the number of the highest mark that the thread reaches. Use the table below to find out what this number equals In wind speed. 1. What is the wind speed? C. Take wind speed readings several times a day for 4 to 5 days. Record your findings. 2. What is the highest speed recorded? D. For a wind turbine to produce electricity, wind speed must be 13 km/h or over. 3. What was the average speed of the wind? Conclusion 1. Is there enough wind to make electricity where you live? 2. What effect would the steadiness of wind speed have on the ability of a wind turbine to produce electricity?" },
      ],
      [
        { type: 'heading', text: "ENERGY FROM LIVING THINGS" },
        { type: 'p', text: "You have learned that millions of years must pass before the remains of living things become fossil fuels. Today scientists are looking for ways of changing plant and animal matter directly into energy. Plant and animal matter is called biomass (bl'o mas). Biomass can be used to produce energy. The process of changing biomass into usable energy is called bioconversion (bi o kenver'zhen)." },
        { type: 'p', text: "A campfire is an example of bioconversion. Wood is the biomass that is changed to produce energy. In recent years many people in the United States have bought wood-burning stoves. They use them to heat their homes. People save money tyy using wood as a fuel, since oil and natural gas are so costly. What could happen if a great many people use wood-burning stoves?" },
      ],
      [
        { type: 'p', text: "Wood-burning stove used Io heot home There is biomass in the trash that people throw away. In the United States, the average person' produces more than 1 kg of trash each day. Much of it can be burned to make heat. This heat can be used to change water to steam. The steam can run generators. Bioconversion of trash helps in two ways. It produces useful energy from lowcost fuel. And it gets rid of unwanted materials. The picture on the left shows trash that will be burned to produce electricity." },
        { type: 'p', text: "Trash containing dead plant and animal matter can be used to make energy in yet another way. By using tiny living things called bacteria (baktir'6 e), trash can be changed to fuel. The bacteria use the biomass in trash as a source of food. In the process, they produce a fuel called methane (meth'an) gas. Methane gas can be burned for heat energy." },
      ],
      [
        { type: 'p', text: "There is another way plants can be used for energy. The girl in the picture is filling the car's" },
      ],
    ]
  },
  "Ch.09 · Changes in the Earth": {
    title: "Changes in the Earth",
    pages: [
      [
        { type: 'heading', text: "WEATHERING CHANGES" },
        { type: 'p', text: "If you view the earth while flying in a plane, you can see many features of its surface. You may see high mountains and rolling hills. You may see flat land, valleys, and cliffs. The surface of the earth is always changing. It is changed by natural processes. In lime, flat land may become a mountain range. Hills and mountains may slowly be worn down. The land is worn down by weathering. Weathering is all the processes that break rock into smaller pieces. The processes of weathering can be put into two groups." },
        { type: 'p', text: "One kind of weathering is called physical weathering. Physical weathering is all the processes that break apart rock without changing its chemical makeup. This weathering causes rock to change its size and shape. The rock is broken into smaller pieces. But the pieces have the same makeup as the rock they came from. The only change they have gone through is a physical one." },
      ],
      [
        { type: 'p', text: "The effect that the freezing and melting of water has on rock is a type of physical weathering. In some mountain regions the daytime temperatures are above the freezing point of water. Water seeps into cracks in rock. At night, temperatures drop below the freezing point. So the water turns to ice." },
        { type: 'p', text: "When water freezes, it expands. As the water in a. crack expands, it pushes with great force against both sides of the crack. This causes the crack to become larger. The daily freezing and melting of water causes large rocks to break up into smaller pieces. This kind of physical weathering is called frost action." },
        { type: 'p', text: "Ice on rock Cliffs weathered by frost action If you live in a place where it gets cold enough, you may see the result of frost action. During the winter large cracks can form in sidewalks. Many cracks and holes, such as the pothole on the left, also form in roads. These are caused by the freezing and melting of water." },
      ],
      [
        { type: 'p', text: "Plants can also cause rocks to crack and break apart. Small plants and trees can grow in soil found in the cracks of rocks. As they grow, the plants push against the sides of the cracks. They cause the cracks to get larger. In time they split the rocks. The tree trunk on the left has split the large rock." },
        { type: 'p', text: "If you look carefully in your neighborhood, you may see places where plants have split some rocks and sidewalks. There may also be places, such as the one shown in the picture below, where tree roots have lifted up parts of the sidewalk." },
        { type: 'p', text: "How does the freezing and melting of water weather rocks? Wash out an empty milk carton. Open the top of the carton and fill it with water. Be sure the carton Is completely filled. Close the top of the carton and tape it shut with a piece of masking tape. Place the carton in a freezer overnight." },
      ],
      [
        { type: 'p', text: "The next day remove the carton from the freezer. Describe what you see. What has happened? What do you think caused it? How could this process weather rocks?" },
        { type: 'p', text: "Physical weathering can also be seen along an ocean shore. Large waves pound rocks at the shore. When waves crash against rocky cliffs, such as those on the right, cracks can form. After a while, rocks may break away and fall into the ocean. The rocks may be lifted and dropped many times by the waves. As they are moved, the rocks strike other rocks. In time the rocks may be ground into small stones and pebbles. Waves may throw the stones and pebbles back against the cliffs. This helps to weather the rocks and cliffs even more." },
      ],
      [
        { type: 'p', text: "Have you ever picked up smooth stones from a beach? This is another example of physical weathering by ocean waves. Many of the rocks weathered by waves are smooth and round." },
        { type: 'p', text: "Wind can also weather rocks. Wind can blow small pieces of sand against rocks. This can polish and smooth the rocks. But the wind alone does not weather rocks very much." },
        { type: 'heading', text: "ANOTHER KIND OF WEATHERING\"" },
        { type: 'p', text: "Rock is also broken apart by chemical weathering. Chemical weathering is all the processes that break apart rock by changing its chemical makeup." },
        { type: 'p', text: "In some places there are large amounts of limestone and water in the ground. Chemical weathering is common in such places. As rain falls through air, it mixes with carbon dioxide gas in the air. Some of this gas dissolves in the rainwater. This changes the rainwater into carbonic (kar bon'ik) acid. This weak acid drains through rock and soil. When it reaches the limestone in the ground, it seeps into cracks in the limestone. As it does, the acid dissolves some of the limestone. This makes the cracks grow larger." },
      ],
      [
        { type: 'p', text: "Over thousands of years the dissolving of limestone can form a system of tunnels under the ground. Large caves are often part of these tunnel systems. The picture below shows one of the largest caves that was formed in this way." },
        { type: 'p', text: "Chemical weathering also breaks up rocks that contain iron. Rainwater contains oxygen from the air. The oxygen is dissolved in the water. Iron in rocks joins with the oxygen in rainwater. Iron oxide, or rust, is the new substance that forms. Iron oxide is soft and easily breaks off rock. When it breaks off, even more of the rock's surface can be changed by falling rain. The red-orange color in the rock on the right is caused by iron oxide." },
      ],
      [
        { type: 'p', text: "Mosses and other tiny plants, called lichens (li'kanz), also weather rock by chemical action. These plants grow on rock and send out rootlike parts. The rootlike parts grow into tiny openings in the rock. They produce acids that dissolve some of the rock." },
        { type: 'p', text: "Both physical and chemical weathering cause rock to break down. Chemical weathering happens at a fast rate in places that are wet and fairly warm. Physical weathering is greatest in wet places that are cooler. Dry places show little weathering effects, except for those caused by wind. Both kinds of weathering result in the forming of soil. Pieces of weathered rock mix with remains of living things. This forms soil." },
      ],
      [
        { type: 'heading', text: "WATER CHANGES THE LAND" },
        { type: 'p', text: "Most weathered materials are carried to other places. The movement of weathered rock and soil from one place to another is called erosion (i ro'zhen). Water, ice, and wind are called the agents of erosion. This is because moving water, moving ice, and moving air carry away weathered materials." },
        { type: 'p', text: "The most important agent of erosion is water. The force behind water erosion is gravity. Gravity causes water to run downhill. The steeper the hill, the faster the water will flow down it. The faster the water flows, the greater the rate of erosion. The amount of water also affects the rate of erosion. The more water there is, the more erosion there will be." },
      ],
      [
        { type: 'p', text: "Erosion may begin when raindrops hit the soil. The falling drops break up large lumps of soil. Some of the water from rain and melting snow flows over the earth's surface. This water is called runoff. As runoff moves downhill, it may form small streams. Small streams may come together to form a larger stream. Several larger streams may join to form a river. Rivers flow into lakes or oceans. runoff As water moves over the surface, it may erode. soil and rocks. The amount of material that is moved depends partly on th£ amount of water. The speed of the water is an even more important factor. Fast-moving water erodes far more material than slower-moving water. If there are no plants growing in soil, moving water may erode a lot of soil." },
      ],
      [
        { type: 'p', text: "The erosion of soil by runoff can be a problem for farmers. The top layers of soil are rich in materials that plants need. So it is important for farmers to prevent erosion of this soil. The pic- ture below shows one way this is done. There is a lot of erosion in hilly places. So farmers plant rows of crops around the sides of hills. The rows follow the curve of the land. When it rains, the rows hold the water and soil in place." },
        { type: 'p', text: "Crops following curve of land to prevent erosion Another way to prevent soil erosion on hills is to build terraces. Terraces, such as those on the left, are flat areas cut into a hillside. They, too, keep water and soil from washing down the hillside. Soil erosion can also be reduced by not clearing the land of all plants. How does this help?" },
      ],
      [
        { type: 'p', text: "Soil erosion is not the only effect of moving water. As water flows in a river, it wears away the riverbed . The riverbed is the rock under the river. The moving water carries materials that act like sandpaper. They grind rock and wear it away. The weathered materials are then carried by the moving water in the river." },
        { type: 'p', text: "The downward cutting of a riverbed can create a deep valley with steep sides. Such a valley is called a canyon. The Colorado River has been cutting the rocks of its riverbed for millions of years. This has formed the Grand Canyon, which is over 1 .5 km deep." },
        { type: 'p', text: "Ocean waves can erode sand from beaches along the shore. In some places the shoreline may lose as much as 380 cubic meters of sand each day. The pictures show a lighthouse at the tip of Long Island, New York. The picture on the top was taken almost 90 years ago. Compare it with the recent picture. Notice how much land has been eroded by ocean waves." },
      ],
      [
        { type: 'p', text: "You have learned that erosion is greatest in fast-moving water. As a river flows downstream, the water starts to slow down. This slowing down causes the river to drop some sediments (sed'ements). Sediments are the materials that are dropped by the agents of erosion. Sediments include sand, soil, and rocks. The dropping of sediments by the agents of erosion is called deposition (dep e zish'an)." },
        { type: 'p', text: "Erosion and deposition are related. Weathered materials are picked up and carried from one place. They are dropped, or deposited, as sediment in another place. In this way the land is constantly changing. In some places it is worn down by erosion. At the same time it is built up in other places by deposition." },
      ],
      [
        { type: 'p', text: "In the spring, snow on the ground melts and there is often a lot of rain. So spring floods are common in some places. Flooding can erode valuable soil and destroy property. But flooding of rivers can be helpful because of deposition." },
        { type: 'p', text: "The floodwaters that overflow the banks of a river carry a lot of material. When these floodwaters soak into the ground, sediments are depos- Rich farmland deposited by floodwaters ited on the land along the river. These sediments enrich the soil. So land near rivers is often good farmland." },
        { type: 'p', text: "Most rivers empty into the ocean. The place whefe a river empties into the ocean is called the mouth of the river. The water at the mouth of a river moves very slowly. Much of the material carried by the river is deposited at the mouth of the river. The sediments form a fan-shaped landmass called a delta. Deltas are made up of sediments of weathered rock." },
      ],
      [
        { type: 'p', text: "The delta shown on the right is at the mouth of the Mississippi River. It is the largest delta in the United States. The picture was taken from an airplane, using special film. Other large rivers also have deltas." },
        { type: 'p', text: "The few remaining sediments that are not deposited on the delta are carried out to sea by ocean currents. Waves may carry some of these sediments and deposit them back on the shore. This forms sand beaches. Sediments may also be deposited as sandbars near the shore." },
        { type: 'activity', text: "Materials sand-and-qravel. mixture / rectangular metal baking pan / metric ruler / 2 books / plastic squeeze bottle / clock or watch with second hand Procedure A. Put a sand-and-gravel mixture into one half of a pan. The mixture should be about 3 cm deep. B. Use a book to raise the same end of the pan that contains the mixture. This represents material on a hillside. C. Fill a plastic squeeze bottle with water. Begin to drop water on the mixture at the rate of one drop every 3 seconds. 1. What do you observe? D. Increase the rate to two drops every 3 seconds. 2. Compare the amount of erosion with that in E. Put another book under the same end of the tray. 3. What does this do to the angle of the troy? F. Again drop two drops every 3 seconds. Compare your results with those from step D. Conclusion 1. What did the water do to the sand-and-gravel mixture? 2. Did Increasing the rate of water flow affect the amount of material moved? Explain. 3. Did increasing the angle of the tray affect the amount of material moved? Explain. Using science ideas How would a steady stream of running water affect the amount of material moved? What body of water would this be like?" },
      ],
      [
        { type: 'p', text: "In the past, there were long periods of very cold temperatures. Ice and snow built up on the land. These periods are known as ice ages. During these ice ages, the land was covered by large, slow-moving masses of ice called glaciers (gla'sherz). The movement of glaciers during ice ages changed the shape of much of the land. The last ice age ended about 10,000 years ago." },
        { type: 'p', text: "During the last ice age, the temperatures over the earth changed from cold to warm and back again. This happened several times. During the cold periods, a lot of snow and ice piled up, and the glaciers grew larger. The weight of the snow and ice caused the glaciers to move southward." },
      ],
      [
        { type: 'p', text: "As the huge ice sheets moved forward, they weathered and eroded the land over which they Rock scratched by glacier moved. They carried soil, rock, and huge boulder great distances. The materials carried by glaciers scraped and cut the land. This action smoothed, polished, and scratched rock. In some places, the tops of mountains were weathered and eroded by glaciers. This formed rounded hills." },
        { type: 'p', text: "Rocky material deposited when glacier stopped During the warm periods, the southern edge of the glaciers melted. As they did, they left behind large hilly ridges of rocky materials. These hilly ridges can be seen today in the northern United States and in Canada. They mark the places where glaciers stopped. The picture above shows one of the ridges made of rocks deposited by a glacier." },
      ],
      [
        { type: 'p', text: "In some places, glaciers dug out large amounts of rock and soil. Many of these dug-out areas filled in with water when the glaciers melted. These places became lakes. The lake regions of Wisconsin and Minnesota contain examples of this. The picture on the left shows a chain of small lakes that were formed by a glacier. Some large lakes were* also formed. Glaciers helped form the Great Lakes." },
        { type: 'p', text: "In some places glaciers exist today- Ice sheets, much like the glaciers of the ice ages, are found in Greenland and the South Pole region. Smaller rhountain glaciers are found in high mountains, such as the Alps and the Rocky Mountains." },
      ],
      [
        { type: 'p', text: "Mountain glaciers are sometimes called rivers of ice. Why is this a good name?" },
        { type: 'p', text: "Mountain glaciers scoop out material from valleys. This widens the valleys and gives them a U shape. The drawing shows a cutaway view of a Ushaped valley formed by a mountain glacier." },
        { type: 'p', text: "Glaciers of past ice ages have had a great effect on changing the shape of the land. The amount of erosion done by today's glaciers is limited. But some scientists believe that ice sheets will return someday and spread across the earth. If this hap- pens, glaciers will reshape the land once again." },
        { type: 'activity', text: "Materials sand-and-gravel mixture / small paper cup / metric ruler / freezer / metal baking pan / modeling clay Procedure A. Place about 2 cm of a sand-and-gravel mixture in a paper cup. B. Fill the cup with water and stir the mixture. Place the cup in a freezer. Allow the mixture to freeze overnight. C. Line the bottom of a baking pan with a layer of modeling clay about 1 cm thick. Put a layer of sand-and-gravel mixture over the clay. This layer should also be about 1 cm thick. D. The next day, remove the paper cup from the freezer. Pe,el the paper cup away from the ice. Examine the ice mixture. This represents a glacier. E. Place the ice mixture in the pan. Press down as you slowly move the ice mixture across the tray. 1, What happens to the sand-and-gravel mix- ture? 2. What happens to the clay? Conclusion 1. What do the particles frozen In the ice represent? 2. How do glaciers affect loose rock and soil as they move over them? 3. How do glaciers affect layers of smooth, soft rock? Which material in the pan showed this effect? Using science ideas What-must hapf|oen to cause a glacier to deposit the material it carries?" },
      ],
      [
        { type: 'p', text: "Like water and ice, wind carries materials from one place to another. When the wind blows, it lifts and carries small dry particles. Most of the particles carried by wind are sand, soil, and dust. When these particles are blown against rock, they can cause physical weathering of the rock." },
        { type: 'p', text: "As wind blows sand from one place to another, the speed of the wind may be slowed by rocks or plants. When the wind slows, it deposits the sand it carries. This causes the sand to pile up. The deposition of wind-carried sand causes piles of sand, called sand dunes, to form. Some sand dunes may be as much as 50 m high. Sand dunes have many shapes. The forming of sand dunes is another way the earth is changed by building up." },
      ],
      [
        { type: 'p', text: "In some places in the desert, wind blows away all loose sand. Only coarse pebbles and other small rocks are left behind. Such areas are known as desert pavement. The picture on the right shows desert pavement. Once desert pavement forms, almost no wind erosion will occur. Why?" },
        { type: 'p', text: "Sand dunes are moved by the wind. Some dunes travel as much as 30 m in a single year. This can create problems for people. Moving dunes have buried farms, towns, and forests." },
        { type: 'p', text: "On the southern shore of Lake Michigan, there are strong winds that blow from the west. These winds have caused a series of large sand dunes to move inland. The dunes are slowly burying trees In an Indiana forest known as Indiana Dunes." },
      ],
      [
        { type: 'p', text: "Sometimes wind erosion can affect a large region. During the 1930s there were several years of drought (drout) in the Great Plains of the United States. A drought is a long period without rain. Many kinds of plants died, and the land became bare. Strong winds eroded the loose dry topsoil. The land affected by this drought and erosion became known as the Dust Bowl. It was named this because of the many dust storms that occurred. Some dust storms were so bad that they blocked out all the sunlight during the day." },
        { type: 'p', text: "There are ways* for farmers to help prevent wind erosion. One way is to plant rows of trees or bushes. These plants act like fences or walls." },
      ],
    ]
  },
  "Ch.10 · Cleaning Up the Earth": {
    title: "Cleaning Up the Earth",
    pages: [
      [
        { type: 'p', text: "----- NATURAL RESOURCES — Why is there a shortage of some resources?" },
        { type: 'p', text: "Look around at the things you use. You use paper, pencils, and books. You walk on the land, drink the water, and breathe the air. All these things are natural resources or come from natural resources. A natural resource is a useful material found in or on the earth. The paper, pencils, and books you use come from trees. Trees are natural resources found on the earth. So are all other plants. Air, water, and land are also valuable natural resources. Can you name other natural resources?" },
        { type: 'p', text: "bowling pins tool handles Some resources can be replaced after they are used. For example, as trees are cut down for wood, new trees can be planted. A tree is a renewable (ri nii'e bal) resource. A renewable resource is one that can be replaced after it is used. Air, water, and land are also renewable resources." },
      ],
      [
        { type: 'p', text: "Since some resources can be renewed, there should be no shortages. There should be a large enough supply for everyone. But the supply has become smaller because of pollution (pe lu'shan). Pollution is the presence of waste or other unwanted materials in a resource. The substances that cause pollution are called pollutants (palii'tants). Pollution of air, water, and land has reduced the useful supply of these resources." },
        { type: 'p', text: "Littered forest Planting tree seedlings Pure air is made up of nitrogen, oxygen, and other harmless gases. The graph below shows the gases in air. The air you breathe often contains unwanted substances. When these substances are added to pure air, air pollution results. Most pollutants in air come from cars, trucks, homes, factories, and power plants. Some come from burning leaves and garbage. Some pollutants in nature are fumes and smoke from forest fires and volcanoes." },
      ],
      [
        { type: 'p', text: "oxygen (21%) nitrogen (78%) - Cars, trucks, homes, and factories burn fossil fuels for energy. Fossil fuels include coal, oil, and gas. Over the past 100 years, the use of fossil fuels has increased. Millions of cars and trucks are now on the roads. There are also many more factories. As a result, more fossil fuels are burned and more waste products are given off into the air. • * Carbon dioxide and carbon monoxide (kar'ben mon ok'si’d) are examples of waste products given off by burning fuels. Smoke carries soot, ash, and dust into the air. These light particles may float in the air for a long time. Winds can carry them to regions far from the source of pollution." },
      ],
      [
        { type: 'p', text: "In parts of the United States and Canada, there is much concern over a special kind of pollution. The major cause of this pollution is the burning of fossil fuels. Volcanoes and forest fires also add to >this kind of pollution. When fuels burn and vol- canoes erupt, chemical wastes enter the air. Wa- ter vapor in the air combines with these chemicals to form weak acids in the air. These weak acids fall to the ground as snow or rain. They are called acid rain." },
        { type: 'p', text: "Acid rain falls on the land and into lakes and streams. When it reaches lakes and streams, it increases the amount of acid in the water. This change kills fish and other living things. Acid rain also breaks down minerals in the soil. The breakdown of minerals robs plants of important materials for growth. So some plants cannot live where there is acid rain." },
      ],
      [
        { type: 'p', text: "Acid rain even damages buildings, water systems, and statues. Scientists know the causes of acid rain. They must find a way to stop acid rain from forming." },
        { type: 'p', text: "Another kind of pollution occurs in towns and cities that have many factories, cars, and trucks. This pollution is called smog. Most smog is a mix- ture of smoke and fog. Smog occurs when calm, moist air near the ground is trapped and does not move away. The air remains in the area for several days. The longer the air stays in one place, the worse the pollution becomes. In the pictures below, you can see the effects of smog. Smog can be harmful. It can even cause death. In certain cities, smog is not as common as it once was. These cities have tried to control air pollution." },
      ],
      [
        { type: 'p', text: "Today, people are aware that air pollution is a big problem. There are many ways that pollution can be controlled. Since cars and trucks cause Statue damaged by acid rain New York City In smog New York City on a clear day much of the pollution, people can walk, ride bicycles, or take trains and buses. They can join car pools to get to school or wosk. In this way, fewer cars and trucks will be on the roads." },
        { type: 'p', text: "Using trains and buses Today new cars must have devices that trap or burn up harmful gases in car exhaust. Most new cars are built so that they burn only unleaded gasoline. Burning gasoline that has lead in it causes harmful substances to be released. The picture shows the testing of car exhaust." },
      ],
      [
        { type: 'p', text: "Factories are required to use special devices in their smokestacks. These devices use an electrical charge to attract particles from smoke. They also remove harmful waste gases." },
        { type: 'p', text: "An important law, the Clean Air Act, was passed in 1970. This law limits the amount of pollution allowed in the air. When the amount gets too high, factories are ordered to stop burning certain fuels. When pollution is reduced to a safe level, the factories can begin burning these fuels again. The picture shows a machine that tests for air pollutants." },
        { type: 'activity', text: "Materials large empty coffee can / 1 m of wire / scissors / white paper / glue / petroleum jelly / hand lens Procedure A. Wrap a piece of wire once around an empty coffee can. Twist the wire as shown. With the free end, form a handle. B. Cut out a round piece of white paper a little smaller than the bottom of the can. Glue the paper to the inside bottom of the can. C. Spread petroleum jelly over the paper. 1. Why do you think you need to spread petro- D. Hang the can outdoors in an open area. A good place would be on a clothesline or a fence. E. After 1 or 2 weeks, take the can Indoors. Remove the paper circle from the can. Examine the paper with a hand lens. 2. Did you find anything on the jelly-covered pa- per? If so, draw what you found. 3. Compare your findings with those of your classmates. Was there any difference? Make a list of what you found and what the others found, Conclusion Are there solid particles in the air you breathe? If so, where might they come from? Using science Ideas Suppose you want to find the difference between pollution in the city and pollution in the country. Describe an activity you might do that would show this." },
      ],
      [
        { type: 'p', text: "Most of the water on the earth is in the oceans. Because of the salt in the oceans, this water cannot be used for drinking. It also cannot be used in industry or in farming. People must depend on fresh water for their needs. Most fresh water comes either from under the ground or from lakes, rivers, and streams. It is important to take care of the limited supply of water." },
        { type: 'p', text: "How much water do you use each day? Some studies show that each person in the United States uses nearly 400 L a day. Some people have guessed that industries in the United States use about 10 billion L of water a day. Large amounts are also needed to water farmland in certain parts of the country. Most of this water comes from lakes, rivers, and reservoirs." },
      ],
      [
        { type: 'p', text: "If the freshwater supply is polluted, there is less water left for people, farms, and industries. Polluted water means there is also less water for fishing and swimming." },
        { type: 'heading', text: "WATER TREATMENT" },
        { type: 'p', text: "Water can be polluted when sewage (su'ij) is dumped into it. Sewage contains waste from sinks, toilets, and showers. Most sewage comes from homes and businesses. Sewage in water can cause disease in people who drink the water. What other problems are caused by sewage?" },
        { type: 'p', text: "Most cities have sewage-treatment plants that remove most of the pollutants. The water must pass through several steps. Follow these steps in First, sewage that enters these plants must pass through screens. These screens filter and remove large objects. The water then passes to a settling tank. Light materials float to the top, where they are skimmed off. Heavier materials sink and are removed. The water is pumped through a filter and then to a second settling tank. From there it is treated with the chemical chlorine (klor'On). The chlorine kills certain harmful living things in the water. After the water has been treated*, it is returned to lakes, streams, and rivers. Sewage treatment plant 246 Water can be polluted by fertilizers and chemical sprays. Many farmers use chemical fertilizers (fer'ta 11 zerz) on their crops. A fertilizer is a substance that helps plants grow. Chemical sprays are often Used to kill-insects and weeds that damage crops. Chemicals from the fertilizers and sprays soak into the soil when it rains. In time wa- ter carrying these chemicals drains into streams and rivers. The streams and rivers then empty into lakes and oceans. This is how these waters become polluted." },
      ],
      [
        { type: 'p', text: "Fertilizers entering the water increase the growth of small plants called algae. When the algae die, they pile up on the bottoms of ponds and lakes. As the dead plants decay, they may use oxygen from the water. As the oxygen supply decreases, fish and other animals that get oxygen from the water may die. This kind of pollution is shown in the drawing." },
        { type: 'p', text: "Chemicals from insect and weed sprays can poison fish and other living things in the water. The sprays can even affect living things that live near the water. This happens through a food chain. For example, a smaU fish may take in the poison when it eats small plants. The small fish may be eaten by a larger fish. The larger fish may be eaten by a large bird. The poisons build up in the bird as it eats more fish. In time the bird dies from the poison." },
      ],
      [
        { type: 'heading', text: "POISON IN 1HE FOOD CHAIN" },
        { type: 'p', text: "Pollution from fertilizers and insect sprays can be reduced by using less of these chemicals. Sometimes farmers plant shrubs and grasses near water. These plants help prevent soil erosion. In this way, soil carrying chemicals will not enter the water." },
        { type: 'p', text: "Industries can also pollute water. When industries make products, they may dump liquid or solid wastes into rivers and lakes. Many of these wastes poison the water. The poison wastes make The water unsafe for drinking and swimming." },
        { type: 'p', text: "Many industries have built their own waste treatment plants. These plants remove harmful substances from water before it enters rivers, lakes, or streams." },
        { type: 'p', text: "Some industries also release hot water into streams and lakes. The dumping of heated mate- rial into water is called thermal (ther'mel) pollution. Hot water cannot hold as much oxygen as cold water. With lower amounts of oxygen, certain plants and animals cannot live in the water." },
      ],
      [
        { type: 'p', text: "There are ways in which industries and power plants can stop thermal pollution. Instead of re- leasing heated materials into lakes and rivers, the heat can be released into the air. For example, some nuclear power plants have large cooling towers like the one shown. Hot water from the power plant is pumped to the cooling tower. In the tower, the hot water passes through coiled pipes. Cool air is then blown over the pipes. The air, which is now heated, is released through the top of the tower. The cooled water is returned to the power plant for reuse." },
        { type: 'p', text: "In recent years a new problem has developed. This problem is oil spills. Huge ships are used to carry oil across the oceans. Sometimes the tanks in these ships leak oil into the ocean. Another source of oil spills is offshore drilling for oil. Long stretches of beach have been damaged because of oil spills from these offshore wells. Fish and other wildlife have been killed by oil spills. The bird in the picture is being cleaned up after an oil spill. The people are tossing straw to stop the spread of oil." },
      ],
      [
        { type: 'p', text: "Cleanup after oil spill" },
        { type: 'sidebar', text: "Do you know? Several years ago a disaster occurred off the coast of England. The merchant ship Torrey Canyon, carrying thousands of metric tons of crude oil, crashed into some rocks. Oil began to pour out of the ship. Ships that were sent to help the Torrey Canyon dumped hundreds of metric tons of detergent into the water to break up the spreading oil sljck. But the oil slick did not break up. Workers tried to burn the oil that floated on the water. The fire spread far across the water. But the oil kept spreading. Soon the oil reached the nearby French coast. Chicken wire and straw were laid over the oyster beds to keep out the oil. Still, the oil kept spreading. Several weeks passed before the oil could be controlled. By that time, 192 km of British beaches had been ruined. Thousands of oysters, mussels, birds, fish, and plants had died." },
      ],
      [
        { type: 'activity', text: "Materials graduate / 2-L plastic soft-drink bottle / clear plastic pill bottle / red or blue food coloring / white paper / water / 500-mL beaker Procedure A. Use a graduate to measure 10 mL of water. Pour the water into a plastic pill bottle. B. Add 1 drop of food coloring to the water in the pill bottle. Swirl the bottle gently to mix the color evenly. Hold a sheet of white paper behind the pill bottle. Observe how deep the color of the water is. C. Using a 500-mL beaker, pour 1,000 mL of water into a plastic soft-drink bottle. (Fill the beaker twice.) D. Add 1 drop of food coloring to the bottle. Swirl the bottle to mix the color evenly. Hold a sheet of white paper behind the bottle. Observe how deep the color of the water is. 1, Is the color of the water In the soft-drink bottle deeper than the color of the water in the pill bottle? E. Imagine that the food coloring is a harmful pollutant. imagine that the pill bottle represents a small pond and the soft-drink bottle represents a lake. 2. Will the pollutant do more harm in the pond Conclusion 1. What is the difference between the effect of food coloring in the pill bottle and in the soft-drink bottle? 2. Compare the effect of the same amount of pollution on both a small and a large body of water." },
      ],
      [
        { type: 'p', text: "There are several things that threaten the soil. One of the most serious is soil erosion. If soil erosion is not controlled, valuable land can be lost forever. The plants in the picture were planted along the road to prevent erosion of the hillside." },
        { type: 'p', text: "Soil can be polluted by toxic (tok'sik) wastes. Toxic wastes are wastes that are poisonous. These wastes may be produced by certain industries and then buried in the soil. Even toxic wastes stored in drums can reach the soil if these drums leak. The chemicals can stay in the soil a long time. They can harm or kill living things in the soil. They can even seep into water supplies." },
      ],
      [
        { type: 'p', text: "Government and industries are working to clean up chemical dump sites. New ways to store and get rid of chemical wastes are being studied. The picture below shows workers testing drums for leakage. They are helping to prevent further land pollution." },
        { type: 'p', text: "Drums of toxic wastes Checking leaking drums" },
        { type: 'activity', text: "One of the ugliest kinds of pollution is litter. It is on city streets, country roads, and in fields and forests. People throw away huge amounts of trash. Some forms of litter are more of a problem than others. Paper, cloth, cardboard, and wood are biodegradable (bi o di gra'da bal) materials. Biodegradable materials are materials that decay, or are broken down by living things. When materials decay, they break down into simpler materials. Small organisms in the soil break down biodegradable materials as they use them for food. These materials become part of the soil. But not all materials are biodegradable. Plastic and aluminum are not broken down by living things. Materials that are not broken down by living things are nonbiodegradable (non bi 0 digrS'de bel) materials. These materials litter the land long after they have been thrown away. Which materials are biodegradable? Collect several items that might be thrown out. You might get a cardboard cereal box, an aluminum can, and table scraps. You will also need a shallow pan and enough soil to fill the pan. Place a thin layer of soil in the pan. Then place the Items you collected over this layer. Leave space between each item. Cover with more soil, Moisten the soil with water. Place the pan outdoors for a week. Take the pan inside and dig out the items you covered. Have any changed? Have any stayed the same? *" },
      ],
    ]
  },
  "Ch.11 · Changes in the Weather": {
    title: "Changes in the Weather",
    pages: [
      [
        { type: 'heading', text: "HOW WEATHER BEGINS" },
        { type: 'p', text: "What causes uneven heating of the atmosphere?" },
        { type: 'p', text: "How does weather begin? It begins with energy from the sun. You have learned that energy from the sun is called solar energy. It. is this energy that causes weather." },
        { type: 'p', text: "What happens to the sun's energy as it enters the atmosphere? Some of it is reflected, or bounced back, into space by clouds, dust, and air particles. A small amount is absorbed, or taken in, by the atmosphere. Absorbed solar energy changes to heat energy. So only a small amount of the atmosphere is heated directly by the sun." },
        { type: 'p', text: "About half of the sun's energy that enters the atmosphere passes through the air and strikes the earth's surface. Some of this energy is absorbed and changed to heat. This warms the earth's surface. Heat from the earth's surface then warms the air above it. You can see that the atmosphere gets most of its energy secondhand." },
      ],
      [
        { type: 'p', text: "WHAT HAPPENS TO SOLAR ENERGY 30% reflected by \\ clouds dust, air Weather is caused by the uneven heating of the atmosphere. The air is heated unevenly because the earth's surface is heated unevenly. Why does this happen? There are several reasons. One reason is due to the round shape of the earth. It causes different parts of the earth to receive different amounts of solar energy." },
        { type: 'p', text: "Look at the drawing. The rays of the sun strike the equator directly. When the sun's rays strike the earth directly, the 1 earth's surface is heated the most. Look at the areas north and south of the equator. In these places the sun's rays strike the earth's surface at a slant. When the rays strike the surface at a slant, the surface is heated less." },
      ],
      [
        { type: 'p', text: "You can see why the earth is heated more at the equator than at the poles. Where would the atmosphere be colder, over the poles or over the equator? Why? earth's surface Another reason that the earth's surface is heated unevenly can be seen in pictures taken from a plane. Such pictures show places covered by white snow and dark soil. They show green fields and forests, blue water, and red deserts. These different-colored surfaces absorb different amounts of energy from the sun. The amount of solar energy that they reflect is also different." },
        { type: 'p', text: "Light-colored surfaces reflect much of the sun's energy that strikes them. Dark -colored surfaces absorb much of the sun's energy that strikes them. Which gets warmer, a light-colored surface or a dark -colored surface? What color clothing is best to wear on a hot summer day? Why?" },
      ],
      [
        { type: 'p', text: "The more solar energy a surface absorbs, the more the surface warms the air above it. Do you think that snow reflects, or absorbs, most of the solar energy that strikes it? Would dark soil absorb, or reflect, more solar energy? Would the air above dark soil be warmed more, or less, than the air above snow? You can see that differences in the color of the garth's surface cause uneven heating of the earth's atmosphere." },
        { type: 'p', text: "There is another factor that causes the earth's surface to heat unevenly. About three-fourths of the earth is covered by water. Water and land areas absorb solar energy at different rates." },
        { type: 'p', text: "Land and water heat up at different rates. During the day, the sun shines and the land heats up faster than the water. So the air over the land becomes warmer than the air over the water. While the land heats up faster than the water, it also loses heat faster. At night, when there is no sunlight, the warm land cools quickly. So the air over the land becomes cooler. The water holds heat and stays warm at night. What would the air over the water be like at night?" },
      ],
      [
        { type: 'p', text: "Very little heat from the earth's surface and atmosphere escapes into space. This is because clouds, dust, and air particles trap the heat. This is an example of the greenhouse effect. In Chap- ter 8 you learned how the greenhouse effect can be used to heat buildings. On a large scale, the greenhouse effect keeps the earth warm." },
        { type: 'activity', text: "and cool? Materials 6 paper cups / scissors / dark-colored soil / light-colored sand / 3 thermometers / lamp Procedure A. Cut the tops off three paper cups so that the remaining part is about 4 cm deep. Fill each cup with one of the following materials: dark-colored soil, light-colored sand, and water. B. Place the cups together as shown. Put a thermometer Into each cup. The bulb of the thermometer should be covered by about 0.5 cm of sand, soil, or water. Rest the top of each thermometer on a paper cup that has been turned upside down. C. Copy this chart. Record the starting temperature in each cup. 1. Do you think the materials will heat at differ- D. Place a lamp so its light bulb is about 15 cm from the tops of the cups. Turn on the lamp. After 5 minutes read and record the temperature in each cup. 2. Which material was heated the most? Which was heated the least? 3. If you turn off the lamp, do you think the ma- E. Turn off the lamp. After 5 minutes read and record the temperature in each cup. 4. Which material cooled the least? The most? Conclusion How does this* activity help explain the uneven heating of the earth?" },
      ],
      [
        { type: 'p', text: "Air is made up of particles of matter. Like all matter, air has mass. The mass of the atmosphere above the earth pushes down on the surface. This causes air pressure. The pressure of air changes from day to day and from place to place. The temperature of the air affects the pressure of the air." },
        { type: 'p', text: "When air is heated, it expands. This means that the particles in air move farther apart. When this happens, the air becomes less dense. So there are fewer air particles over a certain part of the earth's surface. This lowers the air pressure in that place." },
        { type: 'p', text: "Before heating (higher pressure) After heating (lower pressure) Usually when temperature increases, air pressure decreases. Think about equal volumes of warm air and cold air. Would the cold air have higher, or lower, air pressure than the warm air?" },
      ],
      [
        { type: 'p', text: "The amount of water in the air also affects the air pressure. The more water vapor there is in air, the lower the air pressure. This may seem strange to you. But keep in mind that water vapor is a gas. Water vapor is less dense than air. So 1 L of water vapor has less mass than 1 L of air. Usually the more water vapor in air, the lower the air pressure." },
        { type: 'p', text: "Differences in air pressure cause air to move. This movement of air is wind. Winds may be gentle brgezes, or they may be strong gusts. The greater the difference in air pressure from one place to another, the greater the strength of the wind. Small differences in air pressure bring gentle breezes. Air always moves from regions of high pressure, called highs, to regions of low pressure, called lows." },
      ],
      [
        { type: 'p', text: "There are different groups of winds. Some winds are local winds. Local winds are caused by local differences in pressure. For example, there are differences in air pressure over land and water. These differences cause winds to change direction along coastal regions." },
        { type: 'p', text: "During the day the air over the land is heated more than the air oyer the water. So the pressure of the air over the tend is lower. The cooler, highpressure air over the water blows toward the land. It moves under the warm, low-pressure air and pushes it up. This movement of air from water to land is called a sea breeze. On a summer day at the beach, you can often feel cool breezes blowing from the sea to the land." },
      ],
      [
        { type: 'p', text: "At night the air over the land becomes cooler than the’air over the water. So the pressure of the air over the land is higher. This air blows toward the water. It pushes up the warm, low-pressure air over the water. This movement of air from land to water is called a land breeze." },
        { type: 'p', text: "Sea and land breezes are local winds. But the earth has large regions of high and low pressure. Air moves from the high-pressure regions to the low-pressure regions. This movement of air, along with the rotation of the earth, creates wind belts, shown in the drawing. These wind belts, which circle the earth, are called global winds. Global winds are another group of winds." },
      ],
      [
        { type: 'p', text: "The global winds in each belt blow steadily in the direction shown by the arrows. The winds are named for the direction from which they come. Most of the United States lies within a global wind belt called the westerlies. Because of the direction in which these global winds blow, much of the weather in tKe United States moves from west to east across the country." },
        { type: 'p', text: "Have you ever noticed how hot and humid it can be on a summer day? Then, the very next day, the air is cool and dry. This type of change in the weather is caused by the movement of air masses. An air mass is a large body of air that has about the same temperature and moisture throughout. When air stays over a region of the earth for a long time, the air takes on the properties of that region." },
      ],
      [
        { type: 'p', text: "There are four basic kinds of air masses. Air masses are named for their temperature and for the amount of moisture they contain. The kind of air mass that forms depends on where it forms. Cold, wet air masses form over cold ocean waters. Cold, dry air masses form over cold land areas near the poles. These regions are usually covered by snow and ice." },
        { type: 'p', text: "(warm, wet air masses form over oceans near the equatorT/Where do warm, dry air masses form? What kind of air mass would form in each place shown on page 269 and this page?" },
        { type: 'p', text: "The map shows the six major areas where air masses that affect North America form. It shows the kind of air mass that forms over each area and the path it often follows. During winter a cold, dry air mass will bring clear but very cold weather. In summer a warm, wet air mass will mean hot, humid weather. How long any kind of weather remains in an area depends on how fast an air mass is moving." },
      ],
      [
        { type: 'heading', text: "WHEN AIR MASSES MEET" },
        { type: 'p', text: "How do cold fronts aqd warm fronts differ?" },
        { type: 'p', text: "You have learned that air masses move. As one air mass moves away from a region, another air mass moves in. The place where two air masses meet is called a front. Changes in weather take place at a front." },
        { type: 'p', text: "Fronts are named for the kind of air mass moving into a region. The drawing shows what happens when a cold air mass moves into a warmer air mass. The place where these air masses meet is a cold front." },
        { type: 'p', text: "As the dense, cold air mass moves forward, it remains close to the ground. It moves under the less dense, warm air mass. This forces the warm air to rise quite rapidly. As the warm air is forced up, it cools. Water vapor in the air condenses. The water vapor changes to tiny drops of liquid water. These drops form clouds. The clouds that form along a cold front are often dark towering clouds." },
      ],
      [
        { type: 'p', text: "Brief but heavy rain may occur along cold fronts. And wind speed may increase a great deal. Thunderstorms are common along cold fronts. Sometimes very wet, warm air is pushed up by a cold front. This can form a line of thunderstorms ahead of the front. Under certain conditions, tornadoes (tor na'doz) can form along with a line of thunderstorms. A tornado is the most violent kind of storm." },
        { type: 'p', text: "Tornadoes are narrow, funnel-shaped spirals of air. Wind speeds in a tornado may be as much as 800 km/h. Tornadoes hang from the bottom of storm clouds. They move in a twisting path. From time to time, they touch the ground. When they do, they can destroy buildings, uproot trees, and carry cars many meters through the air." },
      ],
      [
        { type: 'p', text: "During winter, a. blizzard (bliz'ard) may form along a cold front. Blizzards occur when there are large differences in pressure between two air masses. Blizzards are snowstorms in which temperatures are below freezing and winds are very high." },
        { type: 'p', text: "After a cold front passes, the temperature in the region drops. The sky usually clears and fluffy white clouds may.be seen. Why does the temperature drop after a cold front passes?" },
        { type: 'p', text: "Now look at the drawing that shows a warm front. A warm front is the place where a moving warm air mass meets a colder air mass. The ■ * - dense,, cold air mass remains close to the ground. As the’ less dense, warm air mass moves forward, it slowly slides up,and over the cold air mass. As it slowly rises, the warm air cools. Water vapor in the warm air condenses. High thin, feathery clouds may form. They are a sign that a warm front is coming." },
      ],
      [
        { type: 'p', text: "A warm front passes through a region more slowly than does a cold front. As the warm front moves, thick low clouds may form ahead of it. Steady, light rain may fall for a day or more. When the warm front passes, the temperature rises and the sky slowly clears." },
        { type: 'p', text: "Sometimes changes in weather during a single day can be extreme. The greatest daily temperature change ever recorded occurred in Browning, Montana. On the afternoon of January 23, 1916. the temperature was 6.7°C. During the night it dropped to -49°C. This was a difference of almost 56°Cl The highest temperature ever recorded was In Libya. On September 13. 1922, the temperature reached 58“C. The lowest recorded temperature was In Antarctica on July 31, 1983. The reading was -89.2°C." },
      ],
      [
        { type: 'p', text: "Other records include 1,946 mm of rain that fell in a single 24 hour period on an island in the Indian Ocean. The •_ ■ greatest recorded snowfall dur- . 1 «lng a 24-hour period was 193 cm" },
        { type: 'activity', text: "How does the weather change? Materials thermometer / barometer Procedure A. Scientists observe changes in the weather to help them better understand and predict them. You can also do this. First, you should make a chart on a sheet of paper. The chart should have columns for the day, the temperature, the amount of clouds, the air pressure, wind direction, and the weather conditions. B. Write what day it is in your chart. C. Read a thermometer that is in a shady place outside. Record the temperature in your chart. D. Read a barometer. Most barometers have an indicator that can be moved to line it up with the bqrometer needle. This indicator helps you determine whether the air pressure has risen, fallen, or remained steady since the last reading. Line up this indicator with the needle. In your chart, indicate whether the air pressure Is rising, falling, or steady. E. Look at the cloud cover. Indicate in your chart whether it is clear, partly cloudy, or cloudy. Also indicate the direction the wind is coming from. F. Indicate the weather conditions in your chart. You might use terms such as rainy, clear, or hazy. G. Repeat steps B through F at the same time each day for 1 week. Conclusion 1. On what day was the temperature the highest? On what day was it the lowest? 2. How did the barometer change? 3. Based on how the weather changed during the week and on today's weather conditions, what do you think the weather will be like tomorrow?" },
      ],
      [
        { type: 'p', text: "There are many types of clouds. You have learned that different types of clouds form along cold fronts and warm fronts. Clouds are named for their shape. The type of cloud that forms depends on the conditions of the atmosphere. So the type of cloud that you see depends on the weather." },
        { type: 'p', text: "The large fluffy white clouds often seen during fair weather are called cumulus (kyu'mya las) clouds. Cumulus means \"heap.\" These clouds are flat on the bottom. Their rounded tops can billow high into the sky." },
        { type: 'p', text: "The thin, wispy clouds that look like feathers or curls of hair are called cirrus (sir'as) clouds. Cir- rus means \"curl.” Cirrus clouds form high in the sky. The air at this height is very cold. So cirrus clouds are made up of tiny ice crystals. You often see cirrus clouds in a blue sky. They are some- times a sign that a warm front is moving in and that the weather will soon change." },
      ],
      [
        { type: 'p', text: "Thick low clouds that cover the sky are called stratus (stra'tes) clouds. Stratus means \"layer.'' These sheetlike clouds are a sign of rainy weather. Fog is a stratus cloud near the ground." },
        { type: 'p', text: "What weather forecasts can you make by looking at clouds? Make a chart like the one shown. For the next 7 days, observe the clouds. Try to identify the types of clouds you see. Find out the temperature at the time you make your observation. What is the weather like? Record all this information in your chart. Using what you know about clouds and fronts, try to forecast the weather for the next day. Predict how the temperature and other weather conditionswill change. The next day. look at your forecast and see how accurate it is." },
      ],
      [
        { type: 'p', text: "There are many other types of clouds. Sometimes clouds have two names. This is because they have features of two types of clouds. For example, stratocumulus clouds are layers of cumulus clouds that cover the sky. Other word parts are added to the names of clouds. Nimbo or nim- bus means \"rain.\" Cumulonimbus (kyii mya lonim'bes) clouds are dark towering clouds. They usually bring thunderstorms. They form when rapidly rising air causes cumulus clouds to build up. Alto is a word part that means \"high.\"" },
        { type: 'p', text: "Look at the clouds shown on these two pages. Read the name of each type of cloud. See if you can tell why each cloud was given that name." },
      ],
    ]
  },
  "Ch.12 · Beyond the Solar System": {
    title: "Beyond the Solar System",
    pages: [
      [
        { type: 'heading', text: "DISTANCES IN SPACE" },
        { type: 'p', text: "You know that the sun and nine planets make up most of the solar system. The sun is at the center of this system. All the planets move in orbits around the sun. Now imagine how large the solar system must be." },
        { type: 'p', text: "The solar system is very large. But the solar system is only one small part of a much larger system. The sun is just one of billions of stars that make up a large family of stars." },
        { type: 'p', text: "Do you have any idea how far bodies in space are from the earth? Look at the table. It lists the distance from the earth to other bodies in space." },
      ],
      [
        { type: 'p', text: "Sun Mercury Venus Moon Mars Jupiter Saturn Uranus Neptune Pluto (closest star to the earth except the sun) How far is it to the moon? To the sun? How far is it to Pluto? You can see that the distances are very large. As tlje distances get larger, the num- bers become more difficult to read." },
        { type: 'p', text: "You are used to traveling much shorter distances. Even if you were to travel across the United States, you would only go about 4,800 km. Therefore, the distances in the table may be too large to fully understand. It may help to think about how long it would take to travel to different bodies in space. Imagine you are in a spacecraft. You are moving at a speed of 40,000 km/h. This is the speed needed to escape gravity once the rocket engines are turned off. It is more than 400 times faster than a car on a highway." },
      ],
      [
        { type: 'p', text: "Look at the drawing. It shows how long it would take to reach certain bodies in space. How long would it take to reach the moon? Could you reach Proxima Centauri (prok'se me sen tor'i) within your lifetime? It would take about 116,906 years to reach this star. It is even more difficult to imagine how(long it would take to reach a star that is farther away. Do you think people from the earth will ever visit other stars?" },
        { type: 'p', text: "For centuries people have wondered about the size of the universe (yii'ne vers). The universe includes all of space and all the matter and energy in it. People have wondered how far out space goes. They have wondered where it ends and even (fit ends." },
      ],
      [
        { type: 'p', text: "Astronomer looking through telescope The study of the universe and all the objects in it is a science called astronomy (a stron'e me). Astronomy includes the study of stars, planets, moons, and other objects in space. It is one of the oldest sciences. Scientists who study the universe are called astronomers (a stron'a marz)." },
        { type: 'p', text: "In the picture above, the Italian astronomer Galileo is shown with his telescope. The scene may have occurred in the early 1600s. A modern telescope is shown on page 287." },
        { type: 'p', text: "You have learned that distances between certain bodies in the universe are very great. How do astronomers work with such great distances?" },
        { type: 'p', text: "Units such as meters and kilometers are used to measure much shorter distances. A larger unit is needed to measure distances in space." },
      ],
      [
        { type: 'p', text: "Astronomers use the speed of light in measuring distances in space. Light travels great distances in a short time. For example, light from the sun reaches the earth in about 8 minutes. Light travels 300,000 km in 1 second (km/s). This is equal to 1,080,000,000 km/h. How much faster is this than a car on a highway? To find out, divide 1,080,000,000 by 100, which is about the speed of a car on a highway (100 km/h). 287 Astronomers decided to use 1 year as their time period. First they found the number of seconds in 1 year. Then they multiplied this number by 300,000 km. They found that the distance that light travels in 1 year is 9.5 trillion km. The distance that light travels in 1 year is known as a light-year. Astronomers use this very large unit of distance to measure distances in space." },
      ],
      [
        { type: 'p', text: "The drawing shows the distance from the earth to several stars. The distances are given in lightyears. Can you imagine these distances written in smaller units, such as kilometers? Traveling at the speed of Eght, how long would it take you to get to the star called Pollux (pol'eks)?" },
        { type: 'heading', text: "CHARACTERISTICS OF STARS" },
        { type: 'p', text: "You may think all stars' look alike. By looking closely you might observe that some seem brighter than others. You may even notice that some appear to be slightly different in color. The great distances between stars and the earth make it hard to see all the differences. The most visible difference is brightness. The measure of the brightness of a star as seen from the earth is known as magnitude (mag'ne tiid). In the picture which star is the brightest?" },
      ],
      [
        { type: 'p', text: "The magnitude of a star depends on three things. The first is the star's distance from the earth. Suppose two stars are exactly alike except for their distance from the earth. The one that is closer will appear brighter. It will have a greater magnitude. You can compare the magnitude of a star to the brightness of the headlights of a car. The closer the car is, the brighter its headlights will seem. The closer a star is to the earth, the brighter the star will appear." },
        { type: 'p', text: "The second thing that affects the magnitude of a star is size. Stars differ greatly in size. Some stars are very small. Many of these stars are smaller than the earth. The sun, with a diameter of 1,392,000 km, is a medium-sized star. There are stars that have a diameter 10 to 100 times that of the sun. Supergiant stars have a diameter 100 to 1,000 times that of the sun." },
      ],
      [
        { type: 'p', text: "The third thing that affects the magnitude of a star is temperature. Stars differ greatly in tem- perature. The temperature of a star also determines its color. Look at the drawing that shows star temperature and color. Notice that red stars are the coolest stars. Which stars are the hottest?" },
        { type: 'p', text: "Kjfr dBP ’PBPn '" },
        { type: 'heading', text: "STAR TEMPERATURE AND COLOR" },
        { type: 'p', text: "Suppose that two stars are the same distance from the earth. They are also the same size. All that differs is their temperature. One is blue and one is red. Which will appear brighter? The blue star will seem brighter because it is hotter. It will have a greater magnitude." },
        { type: 'p', text: "A star's magnitude, then, depends on its distance from the earth, its size, and its temperature. All three things must be considered. Re- member that when scientists speak of magnitude, they mean the brightness of a star as it is seen from the earth. 290" },
      ],
      [
        { type: 'activity', text: "What things affect brightness? Materials 3 identical flashlights labeled X, Y, and Z I scissors / cardboard / tape / meterstick Procedure A. Cut three circles of cardbord so that each will cover the end of a flashlight. Cut a hole 1 cm in diameter in the center of each circle. Tape the circles to three flashlights labeled X, Y. and Z. B. Mark three positions on the floor. Position 1 is 1 m away. Position 2 is 10 m away. Position 3 is 20 m away. C. You will need three of your classmates to help you complete this activity. Give each student a labeled flashlight. Have the students stand in a row at position 1. D. Ask your teacher to darken the room. Have the students turn on their flashlights. 1. How would you describe the brightness of E. Have the student with flashlight X stay at posi- tion 1. Have the student with flashlight Y move to position 2. Have the student with flashlight Z move to position 3. 2. Which flashlight looks brightest? Dimmest? F. Cut a cardboard circle with a 2-cm hole in the center. Cut another circle with a 3-cm hole In the center, Replace the circles on flashlights Y and Z with these new circles. G. Have the three students stand in a row at posi- tion 3 and turn on the flashlights. 3. Which flashlight looks brightest? Dimmest? Conclusion What two things affect how bright the flashlights look? Position 3 20 m" },
      ],
      [
        { type: 'p', text: "THE LIFE OF A STAR What Is the life cycle of a star?" },
        { type: 'p', text: "You may be surprised to know that stars have a life cycle. New stars are being \"born\" and old stars are \"dying.'' Of course, the life and death of stars does not happen overnight. Changes in stars take place over billions of years. The drawings show the stages in the life cycle of a typical star." },
        { type: 'p', text: "Not all stars will go through every stage. As you read, look at the drawings." },
        { type: 'p', text: "1 . A star is formed from dust and gas in space." },
        { type: 'p', text: "A cloud of dust and gas found in space is called a nebula (neb'ye la). The dust and gas in such clouds come together because of gravitational attraction. A tremendous amount of matter must collect for a new star to form. There must be as much matter as there is in the sun. As the matter in the nebula presses together, it gets hot. When enough matter comes together and the temperature gets high enough, a new star is \"born.\" Horsehead Nebula When a star first forms, it has a red glow. In this stage the star is large and cool. The matter of the star continues to come together. When a star is \"middle-aged,\" it may be one of several different colors. It may be blue, white, yellow, or red. The color depends on the temperature. The temperature depends on the amount of matter that collects. The more matter that collects, the hotter the star is. So, a hot, blue star forms when a great deal of matter collects. A cool, red star forms when a smaller amount of matter collects. The sun is a yellow star. It is larger and hotter than a red star but smaller and cooler than a blue star. Which star in the drawing could be the sun? A star beginning \"old age\" often swells up . to form a red giant. A red giant is a star that .'is many times larger than the sun. The tem- perature of a red giant is lower than that of the sun. Some scientists believe that the sun will enter this stage millions of years from now." },
      ],
      [
        { type: 'p', text: "vl 5. After a while a red giant begins to collapse into a smaller star. It becomes hotter and appears white in color. A small star in this stage is called a white dwarf. It may be about as large as the earth. Because it is small, a white dwarf does not appear bright. The drawing of the life cycle of a star on page 293 shows a white dwarf. 6. Once most of a star's fuel is gone, it will en- ter the last stage of its life. The star will become a black dwarf. In this stage the star has no heat or light. It is a cold, dense object in space. Not all stars follow these stages. Stars that collapse into the white dwarf stage sometimes explode and become very bright. An exploding star of this type is called a nova. After the.explosion the star will slowly shrink and grow dim. Sometimes a very large star may explode violently. Then it is called a supernova. The Crab Nebula shown on pages 282-283 is a supernova." },
      ],
      [
        { type: 'heading', text: "BLACK HOLE" },
        { type: 'p', text: "> Stars that explode into supernovas sometimes collapse into very dense stars called neutron stars. A neutron star is much smaller than a white dwarf, even though it has more matter Some scientists think that the gravitational pull of a neutron star can be so great that the star disappears. When this happens, a black hole forms. A black hole is a region in space that was once occupied by a star. Some people believe that the gravity of a black hole is so great that not even light can escape. The drawing above shows how a black hole might look." },
        { type: 'p', text: "By this time you probably know that there is gravity everywhere in the universe. Each body in space attracts every other body. Because of gravity, no bodies are all alone in space. Instead, bodies in space collect in families. The sun is one of billions of stars that form the family called the Milky Way. A large group of stars and other bodies in space is called a galaxy (gal'ek sS). The Milky Way is a spiral (spITal) galaxy. This type of galaxy is shaped like a flat disk, or wheel, with curved arms coming out from the center." },
      ],
      [
        { type: 'p', text: "The Milky Way is about 100,000 light-years from edge to edge. The solar system is about one third of the way from the outer edge of the Milky Way. The sun is believed to bfe one of about 200 billion stars in the Milky Way. Can you find the sun in the drawing of the Milky Way on page Many scientists believe that all the objects in the Milky Way revolve around its center. This means that the sun and its planets are moving around the center of the Milky Way. The Milky Way is so large that it takes the sun 250 million years to go once around. It is possible that the sun is just now returning to the place where it was before dinosaurs were on the earth." },
      ],
      [
        { type: 'p', text: "All galaxies are not spiral-shaped. Two other types of galaxies have been discovered. One of these is the elliptical (i lip'te kal) galaxy. An elliptical galaxy is like a spiral one, but it does not have arms. There are more elliptical galaxies than spiral galaxies. But the elliptical galaxies are not as large or as bright. Most of the stars in elliptical galaxies are very old." },
        { type: 'p', text: "Another kind of galaxy is called an irregular (i reg'ya lar) galaxy. An irregular galaxy does not have a definite shape or size. Some scientists believe that this type of galaxy may have formed when two or more galaxies bumped into one another." },
        { type: 'p', text: "Many astronomers believe that entire galaxies are mpving. They think that galaxies are moving toward the outer edges of the universe. The galaxies seem to be moving away from each other. The belief that galaxies are moving is part of a theory that suggests that the universe is expanding. No one seems to know why the universe is expanding. No one knows if it will ever stop expanding. What is your theory about the universe?" },
      ],
      [
        { type: 'heading', text: "MOVEMENT OF GALAXIES" },
        { type: 'activity', text: "Materials round balloon / felt-tip pen / string / 10-cm twist-tie / metric ruler Procedure A. Copy the data chart. Blow up a round balloon to a small size. Tightly twist a twist-tie around the neck of the balloon so that the air does not escape. The balloon represents the universe. B. Use a felt-tip pen to mark five dots on the balloon. Label the dots V. W. X, Y. and Z. Dot Vis in the center. Dots W. X, Y. and Z are an equal distance from dot K The dots represent the galaxies. C. Use string to measure the distance from V to each of the other dots. Find these distances in millimeters by placing the measured string against a meterstick. Record these distances. D. Untie the twist-tie. Blow up the balloon to a medium size. Twist the twist-tie around the neck of the balloon. Repeat step C. 1. Have the distances between dots changed? 2. Find the difference between the measure- E. Untie the twist-tie. Blow up the balloon to a large size. Twist the twist-tie around the neck of the balloon. Repeat step C. 3. Have the distances between the dots changed? 4. Find the difference between the measure- Conclusion 1, How is the expanding balloon like the universe? 2. If dot V represents the Milky Way and the other dots represent other galaxies, what is happening to the galaxies'" },
      ],
      [
        { type: 'p', text: "People have always been interested in the objects they could see in the sky. For centuries people have gazed into the night sky and wondered about stars. They have wondered about such things as what stars were made of and how big they were. As people watched, they noticed that stars seemed to form groups. People observed that even though the stars seemed to change position, the groups stayed together." },
        { type: 'p', text: "Ancient people saw patterns in these groups of stars and gave them names. Today we call these star patterns constellations (kon ste la'shanz). One of the best-known constellations is the Big Dipper. Another is Scorpio (skor'pe o), shown on page 289. Have you ever seen these constellations? Can you name other constellations?" },
      ],
      [
        { type: 'p', text: "Why do stars seem to move? You may know that the stars seem to move in the sky. But you do not see them moving. They seem to move because the earth moves. You can show how the stars seem to move. You will need a black umbrella and a star chart. Use chalk to draw a few familiar constellations on the underside of the opened umbrella. Be sure to draw the North Star at the point where the handle connects with the ribs of the umbrella. Slowly turn the handle of the umbrella counterclockwise. This shows how the stars seem to move in the sky as the earth turns." },
      ],
      [
        { type: 'p', text: "The constellations helped people keep track of certain stars in the sky. People could watch the movements of these stars. They used these star movements to measure time and the seasons." },
        { type: 'p', text: "How did the constellations first get their names? Years ago ancient people named many constellations for people or animals. Some examples are the Great Bear, the Little Bear, and Draco (the Dragon). These names are still used today." },
        { type: 'p', text: "Some constellations are shown on this page. The drawings show the main stars in the constellations. They also show the figure that each star pattern looks like. The main stars in a constellation have names. For example, Sirius (sir'e- es) is part of the Big Dog. Sirius is also the brightest star in the sky. Vega (vb'ge) is a star ir. Lyra (H're). Lyra is a constellation that is the shape of a lyre, a type of harp. Pollux is part of the constellation called the Twins. See if you can find some of these stars in the drawings of the constellations. Do the constellations really look like the things for which they were named?" },
      ],
    ]
  },
};
