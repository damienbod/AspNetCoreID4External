﻿using ResourceServer.Model;
using Microsoft.AspNetCore.Mvc;

namespace ResourceServer.Repositories;

public class DataEventRecordRepository : IDataEventRecordRepository
{
    private readonly DataEventRecordContext _context;
    private readonly ILogger _logger;

    public DataEventRecordRepository(DataEventRecordContext context, ILoggerFactory loggerFactory)
    {
        _context = context;
        _logger = loggerFactory.CreateLogger("IDataEventRecordResporitory");
    }

    public List<DataEventRecord> GetAll()
    {
        _logger.LogCritical("Getting a the existing records");
        return _context.DataEventRecords.ToList();
    }

    public DataEventRecord Get(long id)
    {
        var dataEventRecord = _context.DataEventRecords.First(t => t.Id == id);
        return dataEventRecord;
    }

    [HttpPost]
    public void Post(DataEventRecord dataEventRecord)
    {
        _context.DataEventRecords.Add(dataEventRecord);
        _context.SaveChanges();
    }

    public void Put(long id, [FromBody] DataEventRecord dataEventRecord)
    {
        _context.DataEventRecords.Update(dataEventRecord);
        _context.SaveChanges();
    }

    public void Delete(long id)
    {
        var entity = _context.DataEventRecords.First(t => t.Id == id);
        _context.DataEventRecords.Remove(entity);
        _context.SaveChanges();
    }
}
