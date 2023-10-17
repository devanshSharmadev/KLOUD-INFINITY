package com.kloudinfinty.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.TransferManagerBuilder;
import com.amazonaws.services.s3.transfer.Upload;
import com.amazonaws.util.IOUtils;
import com.kloudinfinty.config.BucketName;
import lombok.AllArgsConstructor;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@AllArgsConstructor
@Service
@Slf4j
public class FileStore {

    private final AmazonS3 amazonS3;

    public void upload(String path, String fileName, @NonNull Optional<Map<String, String>> optionalMetaData, InputStream inputStream) {
        ObjectMetadata objectMetadata = new ObjectMetadata();
        optionalMetaData.ifPresent(
                map -> {
                    if (!map.isEmpty())
                        map.forEach(objectMetadata::addUserMetadata);
                });
        try {
            amazonS3.putObject(path, fileName, inputStream, objectMetadata);

        } catch (AmazonServiceException e) {
            throw new IllegalStateException("Failed to upload the file", e);
        }
    }


    public byte[] download(String path, String key,String username) {
        try {
            S3Object s3Object = amazonS3.getObject("kloud-infinity/"+username, key);
            System.out.println(s3Object);
            S3ObjectInputStream objectInputStream = s3Object.getObjectContent();
            return IOUtils.toByteArray(objectInputStream);
        } catch (AmazonServiceException | IOException e) {
            throw new IllegalStateException("Failed to download the file", e);
        }
    }

    public void delete(String path, String keys,String username) {
        String key = username+"/"+keys;
        System.out.println(path+"    "+key);
        String bucket = BucketName.ToDo_Opr.getBucketName();
        DeleteObjectRequest deleteObjectRequest = new DeleteObjectRequest(bucket ,key).withKey(key);
        System.out.println(deleteObjectRequest);
        this.amazonS3.deleteObject(deleteObjectRequest);
    }

    public void createFolder(String username, String folderName){
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(0);
        InputStream emptyContent = new ByteArrayInputStream(new byte[0]);
        PutObjectRequest putObjectRequest = new PutObjectRequest(BucketName.ToDo_Opr.getBucketName(),username+"/"+folderName+"/", emptyContent,metadata);
        amazonS3.putObject(putObjectRequest);
    }

    public List<S3ObjectSummary> getAll(String username){
        ListObjectsV2Request req = new ListObjectsV2Request().withBucketName(BucketName.ToDo_Opr.getBucketName()).withPrefix(username+"/").withDelimiter("");
        ListObjectsV2Result listing = amazonS3.listObjectsV2(req);
        for (String commonPrefix : listing.getCommonPrefixes()) {
            System.out.println(commonPrefix);
        }
        for (S3ObjectSummary summary: listing.getObjectSummaries()) {
            System.out.println(summary.getKey());
        }
        List<S3ObjectSummary> s3ObjectSummaryList = listing.getObjectSummaries();
        return s3ObjectSummaryList;
    }

    public void update(String path, String keyName, MultipartFile fileName){
        TransferManager transferManager = TransferManagerBuilder.standard()
                .withS3Client(amazonS3)
                .build();
        Upload upload = transferManager.upload(BucketName.ToDo_Opr.getBucketName(),keyName,convertMultiPartFileToFile(fileName));
        System.out.println("Object upload started");
        try {
            upload.waitForCompletion();
            System.out.println("---****************--->" + amazonS3.getUrl(BucketName.ToDo_Opr.getBucketName(), keyName).toString());
            upload.waitForCompletion();
            System.out.println("---****************--->" + amazonS3.getUrl(BucketName.ToDo_Opr.getBucketName(), keyName).toString());
            System.out.println("--**-> " + upload.getProgress());
            System.out.println("---****************--->" + amazonS3.getUrl(BucketName.ToDo_Opr.getBucketName(), keyName).toString());
            System.out.println("--******-> 0");
            System.out.println("Object upload complete");
            System.out.println("");
            System.out.println("Shutting down TransferMananger");
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    private File convertMultiPartFileToFile(MultipartFile file) {
        File convertedFile = new File(file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        } catch (IOException e) {
            log.error("Error converting multipartFile to file", e);
        }
        return convertedFile;
    }



}
