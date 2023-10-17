package com.kloudinfinty.service;

import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.kloudinfinty.model.FileModel;
import com.kloudinfinty.model.Shared;
import com.kloudinfinty.model.User;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface IFileService {
    FileModel saveFile(String title, String description, MultipartFile file , String username);
    byte[] downloadFile(String id, String username);
    List<FileModel> getAllFiles(String username);
    void deleteFile(String fileName,String username);
    void createFolder(String username, String folderName);
    FileModel updateFile( String fileId, MultipartFile file, String username);
    List<S3ObjectSummary> getAll(String username);
    FileModel search(String fileName ,String username);
    void markStar(String username, String fileName);
    List<User> getAllUsers();
    void loginDetailsUpdate(String username, String firstName, String secondName);
    boolean checkPassword(String username, String password);
    void updatePassword(String username, String password);
    void updateLastModification(String username, String fileName, String lastModification);
    S3ObjectInputStream sharedFileDownload(String fileId, String username);

    Shared shared(String username, String fileName, String sharedUser, String sharedOn, boolean writeAccess);

    List<FileModel> getSharedWithMe(String username);

    void updateProfileDp(String username,String file);
}
