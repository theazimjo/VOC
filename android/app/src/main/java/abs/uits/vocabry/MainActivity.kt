package abs.uits.vocabry

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import abs.uits.vocabry.navigation.VocabryNavGraph
import abs.uits.vocabry.ui.theme.VocabryTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            VocabryTheme {
                VocabryNavGraph()
            }
        }
    }
}
