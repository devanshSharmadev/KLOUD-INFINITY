package com.kloudinfinty.controller;

import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import com.kloudinfinty.model.FileModel;
import com.kloudinfinty.model.Shared;
import com.kloudinfinty.model.User;
import com.kloudinfinty.service.IFileService;
import lombok.AllArgsConstructor;


import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("api")
@AllArgsConstructor
@CrossOrigin("*")
public class Controller {
    IFileService service;

    @GetMapping("/{username}/files")
    public ResponseEntity<List<FileModel>> getFiles(@PathVariable("username") String username){
        return  new ResponseEntity<>(service.getAllFiles(username), HttpStatus.OK);
    }

    @PostMapping(path = "/{username}/single/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<FileModel> singleUpload(@RequestParam("title") String title,
                                              @RequestParam("description") String description,
                                              @RequestBody MultipartFile file,
                                              @PathVariable("username") String username){

        return new ResponseEntity<>(service.saveFile(title,description,file,username),HttpStatus.CREATED);
    }

    @GetMapping("/{username}/download/id/{fileId}")
    public ResponseEntity<byte[]> downloadFile(@PathVariable("fileId") String fileId, @PathVariable("username") String username){
        System.out.println(fileId);
        byte[] rep = service.downloadFile(fileId,username);
        if(rep==null || rep.length==0)
            return ResponseEntity.notFound().build();
        else
           return ResponseEntity.ok().body(rep);
    }

    @PostMapping(path = "/{username}/multiple/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<String> multiUpload(@RequestParam("title") String title,
                                              @RequestParam("description") String description,
                                              @RequestBody MultipartFile[] files,
                                              @PathVariable("username") String username){

        if(files.length>7)
            throw new RuntimeException("Too many files to be upload");
        Arrays.asList(files)
                .stream()
                .forEach(file -> {
                    FileModel response =singleUpload(title,description,file,username).getBody();
                });
        return new ResponseEntity<String >(HttpStatus.CREATED);
    }


    @DeleteMapping("/{username}/delete/{fileName}")
    public ResponseEntity<String> delete(@PathVariable("fileName")String fileName,@PathVariable("username") String username){
        service.deleteFile(fileName,username);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PostMapping("{username}/createFolder/{folderName}")
    public ResponseEntity<Void> createFolder(@PathVariable("username") String username, @PathVariable("folderName") String folderName){
        service.createFolder(username, folderName);
        return ResponseEntity.ok().build();
    }

    @GetMapping("{username}/S3/files")
    public ResponseEntity<List<S3ObjectSummary>> getAll( @PathVariable("username") String username){
        return ResponseEntity.ok().body(service.getAll(username));
    }

    @PatchMapping("/{username}/update/id/{fileId}")
    public ResponseEntity<FileModel> update(@PathVariable("fileId") String fileId , @RequestBody MultipartFile file, @PathVariable("username") String username){
        return ResponseEntity.ok().body( service.updateFile(fileId,file,username));
    }

    @GetMapping("/{username}/search/{fileName}")
    public ResponseEntity<FileModel> search(@PathVariable("username")String username, @PathVariable("fileName") String fileName){
        return ResponseEntity.ok().body(service.search(fileName,username));
    }

    @PatchMapping("/{username}/markStar/{fileName}")
    public ResponseEntity<Void> markStar(@PathVariable("username") String username , @PathVariable("fileName") String fileName){
        service.markStar(username,fileName);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{username}/update/name/{firstName}/{secondName}")
    public ResponseEntity<Void> updateName(@PathVariable("username") String username , @PathVariable("firstName") String firstName ,@PathVariable("secondName") String secondName) {
        service.loginDetailsUpdate(username,firstName, secondName);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/Users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok().body(service.getAllUsers());
    }

    @GetMapping("/{username}/checkPassword/{password}")
    public ResponseEntity<Boolean> checkPassword(@PathVariable("username") String username , @PathVariable("password") String password ) {
        return ResponseEntity.ok().body(service.checkPassword(username,password));
    }

    @PatchMapping("/{username}/updatePassword/{password}")
    public ResponseEntity<Void> updatePassword(@PathVariable("username") String username , @PathVariable("password") String password ){
        service.updatePassword(username,password);
        return  ResponseEntity.ok().build();
    }

    @PatchMapping("/{username}/updateDate/fileName/{fileName}")
    public ResponseEntity<String> updateLastModification(@PathVariable("username") String username,@PathVariable("fileName") String fileName, @RequestBody String lastModification){
        service.updateLastModification(username,fileName, lastModification);
        return ResponseEntity.ok().body("update successful");
    }

    // Shared File download api
    @GetMapping("/{username}/sharedDownload/id/{fileId}")
    public ResponseEntity<S3ObjectInputStream> sharedFileDownloadFile(@PathVariable("fileId") String fileId, @PathVariable("username") String username){
        S3ObjectInputStream rep = service.sharedFileDownload(fileId,username);
//        byte[] rep = service.downloadFile(fileId,username);
        if(rep==null )
            return ResponseEntity.notFound().build();
        else
            return ResponseEntity.ok().body(rep);
    }

    @PostMapping("/{username}/sharedTo/{sharedUser}/fileId/{fileId}/sharedOn/{sharedOn}/writeAccess/{writeAccess}")
    public ResponseEntity<Shared> sharedTo(@PathVariable("fileId") String fileId, @PathVariable("username") String username,@PathVariable("sharedUser") String sharedUser, @PathVariable String sharedOn, @PathVariable boolean writeAccess){
        return ResponseEntity.ok().body(service.shared(username,fileId,sharedUser,sharedOn,writeAccess));
    }

    @GetMapping("/{username}/sharedWithMe")
    public ResponseEntity<List<FileModel>> getSharedWithMe(@PathVariable("username") String username){
        return ResponseEntity.ok().body(service.getSharedWithMe(username));
    }

    @PatchMapping("/{username}/updateProfileDp")
    public ResponseEntity<String> updateProfileDp(@PathVariable("username") String username, @RequestBody Object file){

        StringBuffer sb= new StringBuffer(file.toString().split("=")[1]);
        sb.deleteCharAt(sb.length()-1);
        System.out.println(sb.toString());
        service.updateProfileDp(username,sb.toString());
        return ResponseEntity.ok().build();
    }

}
