package ru.itis.favein.models

import javax.persistence.*

@Entity
data class Dashboard (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long,
    val name: String,
    val description: String = "",
    /** img-url */
    val background: String,
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "author_id")
    val author: User
) {
    override fun toString(): String = name
}