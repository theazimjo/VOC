package abs.uits.vocabry.data.market

/**
 * Direct port of src/data/irregularVerbGroups.js — the standard Uzbek-textbook
 * "14 guruh" breakdown of English irregular verbs, grouped by their
 * V1->V2->V3 sound pattern. Used to group the Irregular Verbs pack's word
 * list instead of the normal sort control.
 */
data class VerbGroup(val id: Int, val title: String, val pattern: String, val verbs: List<String>)

object IrregularVerbGroups {

    private val GROUPS = listOf(
        VerbGroup(1, "1-guruh", "–ought / –aught bilan tugaydi", listOf("think", "catch", "bring", "buy", "fight", "teach", "seek")),
        VerbGroup(2, "2-guruh", "–t bilan tugaydi (V2 = V3)", listOf("dream", "sleep", "keep", "deal", "mean", "leave", "feel", "sweep", "bend", "build", "lend", "lose", "send", "spend")),
        VerbGroup(3, "3-guruh", "\"u\" tovushi (V2 = V3)", listOf("stick", "dig", "sting", "swing", "hang", "strike")),
        VerbGroup(4, "4-guruh", "hammasi bir xil (V1 = V2 = V3)", listOf("put", "quit", "bet", "cost", "sweat", "spread", "let", "broadcast", "hit", "hurt", "read", "set", "shut", "split", "burst", "cut", "fit")),
        VerbGroup(5, "5-guruh", "i – a – u tovush almashinuvi", listOf("ring", "sing", "sink", "drink", "swim", "begin", "run")),
        VerbGroup(6, "6-guruh", "i – a – u (qo'shimcha)", listOf("stink", "spring", "shrink")),
        VerbGroup(7, "7-guruh", "V2 \"o\" tovushi, V3 –en/–en", listOf("speak", "choose", "break", "drive", "freeze", "steal", "wake", "write", "rise", "ride", "beat")),
        VerbGroup(8, "8-guruh", "V3 –en / –own bilan tugaydi", listOf("bite", "hide", "forbid", "forget", "fall", "get", "eat", "shake", "take", "blow", "draw", "fly", "grow", "know", "show", "sew", "throw")),
        VerbGroup(9, "9-guruh", "V1 = V3 (become, come)", listOf("become", "come")),
        VerbGroup(10, "10-guruh", "Alohida shakllar", listOf("feed", "find", "have", "hear", "hold", "lay", "lead", "light", "make", "meet", "pay", "say", "sell", "shine", "shoot", "sit", "stand", "tell", "understand", "win")),
        VerbGroup(11, "11-guruh", "Asosiy fe'llar", listOf("be", "do", "go", "see", "lie")),
        VerbGroup(12, "12-guruh", "give, forgive", listOf("forgive", "give")),
        VerbGroup(13, "13-guruh", "–orn bilan tugaydi", listOf("swear", "tear", "wear")),
        VerbGroup(14, "14-guruh", "Ikki xil shakl (–ed / –t)", listOf("lean", "dream", "burn", "smell", "spell", "spill", "spoil")),
    )

    private val OTHER_GROUP = VerbGroup(15, "Boshqa", "Asosiy guruhlarga kirmagan", emptyList())

    private val WORD_TO_GROUP: Map<String, VerbGroup> = buildMap {
        for (group in GROUPS) {
            for (verb in group.verbs) {
                if (!containsKey(verb)) put(verb, group)
            }
        }
    }

    fun getGroup(word: String): VerbGroup {
        val key = word.trim().lowercase()
        return WORD_TO_GROUP[key] ?: OTHER_GROUP
    }
}
