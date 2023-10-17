package com.kloudinfinty.service;

import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.kloudinfinty.config.BucketName;
import com.kloudinfinty.model.FileModel;
import com.kloudinfinty.model.Shared;
import com.kloudinfinty.model.User;
import com.kloudinfinty.repositories.Repository;
import com.kloudinfinty.repositories.ShareRepository;
import com.kloudinfinty.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@AllArgsConstructor
public class FileServiceImpl implements IFileService {

    private final FileStore fileStore;
    private final Repository repository;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final IShareService shareService;


    @Override
    public FileModel saveFile(String title, String description, MultipartFile file, String folderName) {
        if (file.isEmpty())
            throw new IllegalStateException("Cannot upload empty file");
        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", file.getContentType());
        metadata.put("Content-length", String.valueOf(file.getSize()));
        String path = String.format("%s/%s", BucketName.ToDo_Opr.getBucketName(), folderName);
        String fileName = String.format("%s", file.getOriginalFilename());
        if (repository.findByFileNameAndUsername(fileName,folderName) != null)
            throw new AmazonS3Exception("File name exist try another name ");
        try {
            fileStore.upload(path, fileName, Optional.of(metadata), file.getInputStream());
        } catch (IOException e) {
            throw new IllegalStateException("Failed to upload file", e);
        }

        DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        Date date = new Date();
        System.out.println(dateFormat.format(date));


        FileModel fileModel = FileModel.builder()
                .fileName(fileName)
                .title(title)
                .filePath(path)
                .contentType(file.getContentType())
                .username(folderName)
                .starred(false)
                .uploadDate(dateFormat.format(date))
                .lastModification(dateFormat.format(date))
                .isOwn(true)
                .sharedTo(new ArrayList<Shared>())
                .build();
        repository.save(fileModel);
        return repository.findByFileName(file.getName());
    }

    @Override
    public byte[] downloadFile(String id, String username) {
        FileModel fileModel = repository.findById(id).orElse(null);
        System.out.println(fileModel);
        if (fileModel != null) {
            return fileStore.download(fileModel.getFilePath(), fileModel.getFileName(), username);
        }
        return null;
    }

    @Override
    public List<FileModel> getAllFiles(String username) {
        return repository.getByUsername(username);
    }

    @Override
    public void deleteFile(String fileName, String username) {
        FileModel fileModel = repository.findByFileNameAndUsername(fileName,username);
        fileStore.delete(fileModel.getFilePath(), fileName, username);
        repository.deleteById(fileModel.getId());
    }

    @Override
    public void createFolder(String username, String folderName) {
        fileStore.createFolder(username, folderName);
    }

    @Override
    public FileModel updateFile(String fileId, MultipartFile file, String username) {
        FileModel fileModel = repository.findById(fileId).orElse(null);
        String path = fileModel.getFilePath();
        String fileName = file.getOriginalFilename();
        try {
            fileStore.update(path, username + "/" + fileName, file);
        } catch (AmazonS3Exception e) {
            throw new AmazonS3Exception("Issue while updating the file");
        }
        return repository.save(fileModel);
    }


    public List<S3ObjectSummary> getAll(String username) {
        return fileStore.getAll(username);
    }

    @Override
    public FileModel search(String fileName, String username) {
        return repository.findByFileNameAndUsername(fileName, username);
    }

    @Override
    public void markStar(String username, String fileName){
        FileModel fileModel = repository.findByFileName(fileName);
        boolean starred = fileModel.isStarred();
        if(!starred) {
            fileModel.setStarred(true);
            repository.save(fileModel);
        }
        else {
            fileModel.setStarred(false);
            repository.save(fileModel);
        }
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void loginDetailsUpdate(String username, String firstName, String secondName) {
        User user = userRepository.findByUsername(username);
        user.setFirstname(firstName);
        user.setLastname(secondName);
        userRepository.save(user);
    }

    @Override
    public boolean checkPassword(String username, String password) {
        User user = userRepository.findByUsername(username);
        String oldPassword = user.getPassword();
        return encoder.matches(password,oldPassword);
    }

    @Override
    public void updatePassword(String username, String password) {
        User user = userRepository.findByUsername(username);
        user.setPassword(encoder.encode(password));
        userRepository.save(user);
    }

    @Override
    public void updateLastModification(String username,String fileName, String lastModification) {
        FileModel fileModel = repository.findByFileNameAndUsername(fileName, username);
        System.out.println(fileModel);
        fileModel.setLastModification(lastModification);
        System.out.println(fileModel);
        repository.save(fileModel);
    }

    @Override
    public S3ObjectInputStream sharedFileDownload(String fileId, String username) {return null;
    }

    @Override
    public Shared shared(String username, String fileId, String sharedUser, String sharedOn, boolean writeAccess) {

        Shared shared = Shared.builder()
                .toUser(sharedUser)
                .sharedOn(sharedOn)
                .writeAccess(writeAccess)
                .fileId(fileId)
                .build();
        shareService.add(shared);
        System.out.println(shared);
        String sharedId = shareService.getIdByUsernameAndFileId(sharedUser, fileId);

        System.out.println(sharedId);

        User receiver =  userRepository.findByUsername(sharedUser);
        System.out.println(receiver);
        List<String> receive = receiver.getShareWithMe();
        receive.add(sharedId);
        System.out.println(receive);
        receiver.setShareWithMe(receive);
        System.out.println(receiver);
        userRepository.save(receiver);


        User sender = userRepository.findByUsername(username);
        List<String> to = sender.getShareTo();
        to.add(username);
        sender.setShareTo(to);
        userRepository.save(sender);

        return shared;
    }

    @Override
    public List<FileModel> getSharedWithMe(String username) {
        User user = userRepository.findByUsername(username);
        List<String> sharedIdList = user.getShareWithMe();
        List<Shared> sharedWithMe = new ArrayList<>();
        for(String shareId : sharedIdList){
            Shared shared = shareService.getById(shareId);
            System.out.println(shareId);
            sharedWithMe.add(shared);
        }
        System.out.println(sharedWithMe);
        List<FileModel> fileModelList = new ArrayList<>();
        for(Shared shared : sharedWithMe){
            String fileId = shared.getFileId();
            System.out.println(fileId);
            FileModel fileModel =repository.findById(fileId).orElse(null);
            fileModelList.add(fileModel);
        }
        return fileModelList;
    }

    @Override
    public void updateProfileDp(String username, String file) {
        User user = userRepository.findByUsername(username);
        user.setDp(file);
        userRepository.save(user);
    }

}
