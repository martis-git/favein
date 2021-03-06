package ru.itis.favein.repository

import org.springframework.data.repository.CrudRepository
import ru.itis.favein.models.List

interface ListRepository: CrudRepository<List, Long> {
}