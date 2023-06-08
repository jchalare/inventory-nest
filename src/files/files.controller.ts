import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';


@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('product')
  @UseInterceptors( FileInterceptor(
    'image_url',
    {
        fileFilter: fileFilter
    }
    ))
  uploadProductImage( 
    @UploadedFile() file: Express.Multer.File,
    ){
    
      if(!file){
        throw new BadRequestException(`Invalid file type`)
      }

      return file.originalname;
  }
  
}
