package com.kloudinfinty.repositories;

import com.kloudinfinty.model.FileModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

@org.springframework.stereotype.Repository
public interface Repository extends MongoRepository<FileModel,String> {
    FileModel findByFileName(String fileName);
    List<FileModel> getByUsername(String username);
    FileModel findByFileNameAndUsername(String fileName,String username);
    @Query("{$and:[{username: ?0},{starred:?1}]}")
    List<FileModel> findByUsernameAndStarred(String username, boolean starred);
}
