package com.kloudinfinty.repositories;

import com.kloudinfinty.model.Shared;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ShareRepository extends MongoRepository<Shared, String> {
    @Query("{$and:[{toUser: ?0},{fileId:?1}]}")
    Shared findByToUserAndFileId(String toUser, String fileId);
    Shared getById(String id);
}
