package ru.itis.favein.models

import javax.persistence.*
import kotlin.math.min

@Entity
data class Card(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long,
        val name: String,
        /** TL;DR */
        @Column(length = 512)
        val description: String = "",
        /** Base content */
        @Column(length = 4096)
        val content: String = "",
        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "list_id")
        val list: List,
        @ManyToMany
        val labels: Set<Label>,
        @ManyToMany
        val rates: Set<Rate>,
        @ManyToMany
        val comments: Set<Comment>
) {
    override fun toString(): String = name
    fun getAuthor(): User = list.getAuthor()
    fun getDashboard(): Dashboard = list.dashboard
    fun getSummary(): String {
        val summary = description + content
        return summary.substring(0, min(summary.length, 80)) + "..."
    }
}