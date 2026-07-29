package abs.uits.vocabry.ui.grammar

import androidx.lifecycle.ViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

data class GrammarTopicItem(
    val id: String,
    val title: String,
    val level: String, // A1, A2, B1, B2, C1
    val description: String,
    val ruleSummary: String,
    val example: String,
    val isCompleted: Boolean = false
)

class GrammarViewModel : ViewModel() {

    private val _topics = MutableStateFlow(
        listOf(
            GrammarTopicItem(
                id = "present_simple",
                title = "Present Simple (Hozirgi oddiy zamon)",
                level = "A1",
                description = "Doimiy takrorlanuvchi harakatlar, odatlar va umumiy haqiqatlarni ifodalaydi.",
                ruleSummary = "Subject + Verb(s/es). Inkor: don't / doesn't + Verb.",
                example = "I study English every day. / She works at a hospital."
            ),
            GrammarTopicItem(
                id = "present_continuous",
                title = "Present Continuous (Hozirgi davomli zamon)",
                level = "A1",
                description = "Ayni paytda sodir bo'layotgan harakatlarni ifodalash uchun ishlatiladi.",
                ruleSummary = "Subject + am/is/are + Verb-ing.",
                example = "He is reading a book right now."
            ),
            GrammarTopicItem(
                id = "past_simple",
                title = "Past Simple (O'tgan oddiy zamon)",
                level = "A2",
                description = "O'tmishda ma'lum vaqtda tugallangan harakatlarni ifodalaydi.",
                ruleSummary = "Subject + Verb-ed (yoki 2-shakl). Inkor: didn't + Verb.",
                example = "We visited Samarkand last month."
            ),
            GrammarTopicItem(
                id = "present_perfect",
                title = "Present Perfect (Hozirgi tugallangan zamon)",
                level = "B1",
                description = "Natijasi hozirga ta'sir qiladigan yoki tajribalarni ko'rsatuvchi zamon.",
                ruleSummary = "Subject + have/has + Verb 3-shakl (Past Participle).",
                example = "I have lived in Tashkent for 5 years."
            ),
            GrammarTopicItem(
                id = "passive_voice",
                title = "Passive Voice (Majhul nisbat)",
                level = "B2",
                description = "Harakat bajaruvchisi emas, balki harakat ob'ekti muhim bo'lganda ishlatiladi.",
                ruleSummary = "Subject + be (mos zamonda) + Verb 3-shakl.",
                example = "The letter was sent yesterday."
            ),
            GrammarTopicItem(
                id = "conditionals",
                title = "Conditionals (Shart gaplar: 1, 2, 3-turlar)",
                level = "B2",
                description = "Ehtimollik va gipotezalarni ifodalaydi.",
                ruleSummary = "If + Present Simple, will + Verb (Type 1) | If + Past Simple, would + Verb (Type 2).",
                example = "If it rains, we will stay home."
            )
        )
    )
    val topics: StateFlow<List<GrammarTopicItem>> = _topics.asStateFlow()
}
